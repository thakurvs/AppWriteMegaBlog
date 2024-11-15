import React, {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {Button, MyInput, Select, RTE} from '../index';
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Atom} from 'react-loading-indicators'
import AlertDialogue from "../AlertDialogue";

function PostForm({post}) {

    window.onbeforeunload = () => true;
    const [loading, setLoading] = useState(false); // Loading state for the loader
    const [showAlert, setShowAlert] = useState(false); // State to show/hide alert dialog
    const [error, setError] = useState("");

    const {register, handleSubmit, watch, setValue, control, getValues, formState: { errors }} = useForm({
        defaultValues: {
            title: post?.title || '', 
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || '',
        },
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    // console.log(userData);

    const submit = async(data) => {
        setLoading(true);
        setError("")
        if(post){  //to edit post
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        } else {   //to create new post
            const file = await appwriteService.uploadFile(data.image[0]);
            // console.log(`file is: ${file}`);
            if(file) {
                const fileId = file.$id  //appwrite method return the file id after stored in db
                data.featuredImage = fileId  //we have to update the file id in featuredImage var
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userid: userData.$id,
                })
                console.log(`dbPost is: ${dbPost}`);
                if(dbPost){
                    // Hide loader and show alert
                    setLoading(false);
                    setShowAlert(true);
                } else {
                    setLoading(false);
                    setError("Failed to create post");
                }
            } else{
                setLoading(false);
                setError("Failed to upload image");
            }
        }
    }

    const slugTransform = useCallback((value) => {
        // console.log(value);
        if(value && typeof value === 'string') 
        return value
            // .trim()
            // .toLowerCase()
            // .replace(/^[a-zA-Z\d\s]+/g, '-')
            // .replace(/\s/g, '-')

            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')  // Remove all non-word characters except space and hyphen
            .replace(/\s+/g, '-')      // Replace spaces with hyphens
            .replace(/-+/g, '-')       // Replace multiple hyphens with a single one
            .replace(/^-|-$/g, '');    // Remove leading or trailing hyphen
        
        return ''
        
    }, [])

    React.useEffect(()=>{
        // Problem:
        // watch Subscription: The issue is that watch is providing the form values as a whole, but you're not handling the value correctly. You're calling slugTransform using e.currentTarget.value, which is undefined because watch gives the new form values and not the event.
        //  const subscription = watch((value, name)=> {
        //     if(name === 'title') {
        //         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
        //     }
        //  })

        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const slugifiedValue = slugTransform(value.title); // Transform the value of title into slugifiedValue
                setValue("slug", slugifiedValue, { shouldValidate: true }); // setting the slugifiedValue to the slug field
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

  return (
    <>
        {loading && (
          <div className="w-full flex justify-center items-center min-h-screen bg-gray-100 text-brand dark:text-brand-dark ">
            <div className="loader-container text-brand dark:text-brand-dark">
              <style>{`
                .loader-container {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: rgb(0, 0, 0);
                  z-index: 50;
                }
                @keyframes spin {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
              `}</style>
              <Atom
                size='large'
                text='Submitting...'
                textColor='#3185cc'
                color="rgb(16 184 221)"   // Adjust this to match your desired color
                visible={true}
                strokeWidth={2}
              />
            </div>
          </div>
        )}

        {showAlert && (
          <>
            {/* Fade-out background overlay */}
            <div className="overlay bg-gray-100 text-brand dark:text-brand-dark"></div>

            {/* Alert Dialog Box */}
            <div className="alert-dialog text-brand dark:text-brand-dark">
              <div className="alert-content">
                <h3>Blog Submitted Successfully!</h3>
                {/* <p>Login Successfully</p> */}
                <button className="alert-btn" onClick={() => {
                    setShowAlert(false)
                    navigate('/');
                    }}
                >
                  Close
                </button>
              </div>
            </div>

            {/* Styles */}
            <style>{`
              /* Overlay to fade out the rest of the content */
              .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 255); /* Semi-transparent black */
                z-index: 99; /* Put it behind the alert */
              }

              /* Alert Dialog */
              .alert-dialog {
                width: 30vw;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 100; /* On top of everything */
              }

              .alert-content h3 {
                font-size: 20px;
                margin-bottom: 8px;
              }

              .alert-btn {
                background-color: #3498db;
                color: white;
                padding: 8px 16px;
                border-radius: 5px;
                border: none;
                cursor: pointer;
              }
            `}</style>
          </>
        )}
        
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap py-2">
            <div className="w-2/3 px-2">
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <MyInput
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <MyInput
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    //Problem : onInput Handler: In the onInput handler, you're not correctly transforming the slug as you should be working directly with the value, not the event object.
                    // onInput={(e) => {
                    //     setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    // }}
                    onInput={(e) => {
                        const slugifiedValue = slugTransform(e.currentTarget.value);
                        setValue("slug", slugifiedValue, { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <MyInput
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </>
  )
}

export default PostForm

