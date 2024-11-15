import React, {useState, useEffect} from "react";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './AboutUs.scss';
import { fetchData } from "@/store/dataSlice";
import { Container } from '../components'

const AboutUs = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const { data, loading, error } = useSelector((state) => state.data)
  console.log(`data is ${JSON.stringify(data)}`);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData())  // Dispatch the action to fetch data
  }, [dispatch]);

  // Check if data is available before accessing properties
  const avatarUrl = data?.avatar_url;

  const handleNavigate = () => {
    navigate("/all-posts");
  }
  const handleNavigateLogin = () => {
    navigate("/login");
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  // fetching data here making http api request using fetch method inside useEffect hook
  // const [mydata, setData] = useState([])
  //   useEffect(() => {                
  //       fetch('https://api.github.com/users/thakurvs')
  //       .then(response => response.json())
  //       .then(data => {
  //           // console.log(data);
  //           setData(data);
  //       })
  //       .catch(error => console.error('Error:', error))
  // }, [])

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

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div className="about-us-page bg-white dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=1950&q=80')` }}> {/* Hero Image */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-6">About BlogWorld</h1>
          <p className="text-xl mb-8">Your go-to place for travel tips, adventures, nature, food, and sports stories from around the world.</p>
           {/* Conditionally render the buttons based on authStatus */}
            {authStatus ? (
            <Button variant="default" size="lg" onClick={handleNavigate}>Explore Blogs</Button>
            ) : (
            <Button variant="secondary" size="lg" onClick={handleNavigateLogin}>Login to Explore Blogs</Button>
           )}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg mb-6">
                At BlogWorld, our mission is to inspire and guide you through your travels, adventures, and lifestyle changes by sharing captivating stories, practical tips, and rich experiences from diverse bloggers around the globe.
              </p>
              <Button variant="secondary" size="lg">Learn More</Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497493292307-31c376b6e479?fit=crop&w=1950&q=80" 
                alt="Our Mission" 
                className="rounded-lg shadow-lg w-full object-cover h-96" /> {/* Mission Image */}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
        <div className="container mx-auto px-6 text-center justify-center items-center">
          <h2 className="text-4xl font-bold mb-8">Meet the Team</h2>
          <div className="card dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
            <img src={avatarUrl} alt="Profile Picture" />
            <h2>Vishal Soam</h2>
            <p className="role">React JS Developer</p>
            <p className="description"> 
            Seasoned Frontend Developer with 2+ years of expertise in React.js, Redux, TypeScript, JavaScript, HTML and Tailwind CSS. Skilled in crafting dynamic UIs with Shadcn UI and Radix UI, while ensuring robust performance through React Unit Testing and Jest. Proficient in Restful API Integration, deployment with Nginx, and experienced in build tools like Webpack, Babel, and Vite.
            </p>
            <button>Contact Me</button>
          </div>
          {/* <div className="grid md:grid-cols-3 gap-8">
            <div className="team-member text-center">
              <img 
                src="https://images.unsplash.com/photo-1603415526960-f30f28080dc0?fit=crop&w=500&q=80" 
                alt="Team Member" 
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-2xl font-bold mb-2">John Doe</h3>
              <p className="text-lg text-gray-500">Founder & Chief Editor</p>
            </div>
            <div className="team-member text-center">
              <img 
                src="https://images.unsplash.com/photo-1603415526960-f30f28080dc0?fit=crop&w=500&q=80" 
                alt="Team Member" 
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-2xl font-bold mb-2">Jane Smith</h3>
              <p className="text-lg text-gray-500">Content Strategist</p>
            </div>
            <div className="team-member text-center">
              <img 
                src="https://images.unsplash.com/photo-1603415526960-f30f28080dc0?fit=crop&w=500&q=80" 
                alt="Team Member" 
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-2xl font-bold mb-2">Alice Johnson</h3>
              <p className="text-lg text-gray-500">Travel Blogger</p>
            </div>
          </div> */}
        </div>
      </section>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
        {/* Header */}
        <div className="bg-blue-600 w-full py-8 text-white text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2">We'd love to hear from you! Get in touch with us.</p>
        </div>

        {/* Contact Form Section */}
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg mt-10 mb-6 mx-4 md:mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-6">Join us today to discover more exciting stories, tips, and guides to enrich your adventures.</p>
          <Button variant="outline" size="lg" className="text-white border-white" onClick={handleSignup}>Get Started</Button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
