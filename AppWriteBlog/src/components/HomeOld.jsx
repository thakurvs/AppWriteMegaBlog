import React, {useEffect, useState} from 'react'
import { Container,PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import NoPostsAvailable from '../components/NoPostsAvailable';

function Home() {

    // Fetch authentication status from the store
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector(state => state.auth.userData);
    const searchTerm = useSelector(state => state.search.searchTerm)  // Get search term from Redux
    // console.log(`searchTerm is: ${searchTerm}`);
    const [posts,setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);  // Add loading state

    useEffect(() => {
        if (userData && userData.$id) {  // Check if userData is available
            const userid = userData.$id; // Replace with dynamic userId if
            appwriteService.getPosts(userid)
            .then((posts) => {
                // console.log(`posts are ${posts}`)
                if(posts && posts.documents){
                    // console.log(posts.documents);
                    setPosts(posts.documents);
                    setFilteredPosts(posts.documents);
                } 
                setLoading(false);  // Stop loading once posts are fetched
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            })
        } else {
            setLoading(false); // Stop loading if no userData
        }
    }, [userData]); // Depend on userData so it runs when userData changes
        


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

     // If user is not logged in, prompt to log in
     if (!authStatus) {
        return (
            <div className="w-full flex justify-center items-center text-center min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Please log in to read posts
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
                        <div key={post.$id} className='p-2 sm:w-1/2 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        // </div>
    )
}

export default Home
