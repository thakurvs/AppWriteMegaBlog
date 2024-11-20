import React, { useEffect, useState } from 'react'
import { Container,PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import NoPostsAvailable from '../components/NoPostsAvailable';

function AllPosts() {

    const searchTerm = useSelector(state => state.search.searchTerm)  // Get search term from Redux
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);  // Add loading state

    const userData = useSelector((state) => state.auth.userData);
    const status = useSelector((state) => state.auth.status);
    console.log(`userdata is ${userData.name}`);
    console.log(`userid is ${userData.$id}`);
    console.log(`name is ${userData.name}`);
    console.log(`status is ${status}`);

    // useEffect(() => {
    //     if (userData?.userData && userData.userData.$id && status) { 
    //       const userid = userData.userData.$id; 
    //       console.log(`userid is ${userid}`);
    //       appwriteService
    //         .getPosts(userid)
    //         .then((posts) => {
    //           if (posts?.documents) {
    //             setPosts(posts.documents);
    //             setFilteredPosts(posts.documents);
    //           }
    //           setLoading(false); 
    //         })
    //         .catch((error) => {
    //           console.error("Error fetching posts:", error);
    //           setLoading(false);
    //         });
    //     } else {
    //       setLoading(false); 
    //     }
    // }, [userData, status]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            if (status && userData && userData?.$id) {
              const userId = userData.$id; // Fetch userId safely
              console.log(`Fetching posts for userId: ${userId}`);
              const response = await appwriteService.getPosts(userId);
    
              if (response?.documents) {
                setPosts(response.documents);
                setFilteredPosts(response.documents);
              }
            }
          } catch (error) {
            console.error('Error fetching posts:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (status && userData) {
          fetchPosts();
        } else {
          setLoading(false); // Stop loading if user data is not available
        }
      }, [status, userData]); // Dependency array includes `authStatus` and `userData`

    // Filter posts based on search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredPosts(posts);  // If search is empty, show all posts
        } else {
            const searchResults = posts.filter((post) => 
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(searchResults);
        }
    }, [searchTerm, posts]);  // Only re-run when searchTerm or posts changes
    
    // If data is still loading
    if (loading) {
        return (
            <div className="w-full flex justify-center items-center text-center min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (!status || !userData) {
        return (
            <div className="w-full flex justify-center items-center text-center min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Fetching Posts...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    // If user is logged in but no posts are available
    if (filteredPosts.length === 0) {
        return <NoPostsAvailable />;
    }

    // If user is logged in and posts are available
    return (
        // <div className='w-full text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    {filteredPosts.map((post) => (
                        <div key={post.$id} className='p-2 sm:w-1/2 lg:w-1/4 bg-white dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        // </div>
    )
}

export default AllPosts
