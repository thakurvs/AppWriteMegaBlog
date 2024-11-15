import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    // console.log(slug);
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        setLoading(true);
        setError(null);
        appwriteService.deletePost(post.$id)
        .then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        })

    };

    // Conditionally log post.userId and userData.$id to prevent errors
    // console.log("post is ", post);
    // console.log("post.userId is ", post ? post.userid : "Post not loaded yet");
    // console.log("userData.$id is ", userData ? userData.$id : "User data not available");
    
    const isAuthor = post && userData ? post.userid === userData.$id : false;
    // const isLiked = post && userData ? post.likes.includes(userData.$id) : false;
    // const [likes, setLikes] = useState(post && post.likes ? post.likes.length


    if(loading){
        return <Loader text="Deleting Post..."/>
    }


    return post ? (
        <Container>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <article className="w-full justify-center mb-4 relative p-2 md:px-8 lg:px-16">
                {/* Article Content with added horizontal padding */}
                
                <div className="w-full mb-6">
                    {/* Heading */}
                    <h1 className="text-3xl font-bold" style={{float:'inline-start'}}>{post.title}</h1>
                </div>
                 {/* Horizontal Line */}
                 <hr className="mt-14 mb-2 border-t-1 border-gray-300" />

                <div className="w-full justify-center mb-4">
                    {/* Image with custom height and width */}
                    <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="object-cover" // Ensures the image maintains aspect ratio
                    style={{ width: "100%", maxHeight: "500px" }} // Width 100% and a max height of 500px
                    />

                    {/* Edit and Delete buttons for the author */}
                    {isAuthor && (
                    <div className="absolute right-16 top-4">
                        <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Edit
                        </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                        Delete
                        </Button>
                    </div>
                    )}
                </div>

                {/* Article content with additional browser-specific CSS */}
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </article>
        </Container>
       
    ) : null;
}