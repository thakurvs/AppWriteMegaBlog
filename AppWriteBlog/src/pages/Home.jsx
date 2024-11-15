import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Utensils, Mountain, Leaf, Volleyball } from "lucide-react";
// import { Button } from './components/ui/button'
import TravelImage from '../assets/Travel_Tips.jpg'
import Adventure from '../assets/Adventure.jpg'
import Nature from '../assets/Nature.jpg'
import Sports from '../assets/Sports.jpg'
import Food from '../assets/Food.jpg'
import SoutEastAsia from '../assets/SoutEastAsia.jpg'
import MachuPicchu from '../assets/Machu Picchu.jpg'
import Tokyo from '../assets/Tokyo.jpg'

function Home() {

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1542281286-9e0a16bb7366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fHRyYXZlbHxlbnwwfHx8fDE2ODExMzg1Nzc&ixlib=rb-1.2.1&q=80&w=1080')",
                }}
                >
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-6">
                    <h1 className="text-5xl font-bold mb-6">Welcome to BlogWorld</h1>
                    <p className="text-xl mb-8">
                    Explore the best travel tips, adventures, nature, food, and sports stories from around the globe.
                    </p>
                    <Button variant="default" size="lg" className="text-lg">
                    Explore Blogs
                    </Button>
                </div>
            </section>

            {/* About Section */}
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <h2 className="text-4xl font-bold text-center mb-6">About BlogWorld</h2>
                        <p className="text-lg text-center mb-12">
                            At BlogWorld, we provide travel tips, nature adventures, food exploration, and sports stories shared by bloggers around the globe.
                            We believe in helping our readers connect with the world through shared experiences. 
                            Whether you're a passionate traveler, a nature enthusiast, or a foodie, we've got something for everyone.
                        </p>
                    </div>
                </div>
            </section>

            {/* <section className="py-16">
                <div className="container mx-auto px-6 space-y-16">
                <div className="relative h-80 bg-cover bg-center bg-no-repeat" 
                    style={{ backgroundImage: "url('https://example.com/travel.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center text-white">
                    <h2 className="text-4xl font-bold">Travel Tips</h2>
                    <p className="text-lg mt-2 mb-4">Explore travel guides and tips from seasoned travelers</p>
                    <Button variant="primary" className="text-lg">Read Travel Blogs</Button>
                    </div>
                </div>

                
                <div className="relative h-80 bg-cover bg-center bg-no-repeat" 
                    style={{ backgroundImage: "url('https://example.com/adventure.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center text-white">
                    <h2 className="text-4xl font-bold">Adventure</h2>
                    <p className="text-lg mt-2 mb-4">Discover thrilling adventures from all around the world</p>
                    <Button variant="primary" className="text-lg">Read Adventure Blogs</Button>
                    </div>
                </div>


                <div className="relative h-80 bg-cover bg-center bg-no-repeat" 
                    style={{ backgroundImage: "url('https://example.com/nature.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center text-white">
                    <h2 className="text-4xl font-bold">Nature</h2>
                    <p className="text-lg mt-2 mb-4">Experience the beauty of nature through our blog posts</p>
                    <Button variant="primary" className="text-lg">Read Nature Blogs</Button>
                    </div>
                </div>


                <div className="relative h-80 bg-cover bg-center bg-no-repeat" 
                    style={{ backgroundImage: "url('https://example.com/food.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center text-white">
                    <h2 className="text-4xl font-bold">Food</h2>
                    <p className="text-lg mt-2 mb-4">Explore food from different cultures and regions</p>
                    <Button variant="primary" className="text-lg">Read Food Blogs</Button>
                    </div>
                </div>


                <div className="relative h-80 bg-cover bg-center bg-no-repeat" 
                    style={{ backgroundImage: "url('https://example.com/sports.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-center text-white">
                    <h2 className="text-4xl font-bold">Sports</h2>
                    <p className="text-lg mt-2 mb-4">Dive into the world of sports with expert insights</p>
                    <Button variant="primary" className="text-lg">Read Sports Blogs</Button>
                    </div>
                </div>
                </div>
            </section> */}

            {/* Category Sections */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
                <div className="w-full container px-4 md:px-6" style={{maxWidth:'100vw'}}>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Blog Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CategoryCard
                            title="Travel Tips"
                            description="Expert advice for seamless journeys"
                            icon={<MapPin className="h-6 w-6" />}
                            // image="/placeholder.svg?height=400&width=600"
                            // image="https://images.unsplash.com/photo-1506748686210-58847eea682b?crop=entropy&cs=tinysrgb&fit=crop&w=1080&h=720&q=80"
                            // image="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fHRyYXZlbHxlbnwwfHx8fDE2ODExMzg1Nzc&ixlib=rb-1.2.1&q=80&w=1080"
                            image={TravelImage}
                        />
                        <CategoryCard
                            title="Adventure"
                            description="Thrilling experiences around the globe"
                            icon={<Mountain className="h-6 w-6" />}
                            image={Adventure}
                        />
                        <CategoryCard
                            title="Nature"
                            description="Exploring Earth's breathtaking landscapes"
                            icon={<Leaf className="h-6 w-6" />}
                            image={Nature}
                        />
                        <CategoryCard
                            title="Food"
                            description="Culinary delights from every corner"
                            icon={<Utensils className="h-6 w-6" />}
                            image={Food}
                        />
                        <CategoryCard
                            title="Sports"
                            description="Athletic pursuits and sporting events"
                            icon={<Volleyball className="h-6 w-6" />}
                            image={Sports}
                        />
                    </div>
                </div>
            </section>

            {/* featured posts */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-800 text-black dark:text-white dark:border-gray-700">
                <div className="container px-4 md:px-6" style={{maxWidth:'100vw'}}>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeaturedPostCard
                        title="10 Hidden Gems in Southeast Asia"
                        description="Discover off-the-beaten-path destinations that will take your breath away."
                        image={SoutEastAsia}
                    />
                    <FeaturedPostCard
                        title="The Ultimate Guide to Hiking the Inca Trail"
                        description="Everything you need to know to conquer this iconic trek to Machu Picchu."
                        image={MachuPicchu}
                    />
                    <FeaturedPostCard
                        title="Street Food Adventures: Tokyo's Best Kept Secrets"
                        description="Explore the vibrant flavors of Tokyo's street food scene like a local."
                        image={Tokyo}
                    />
                    </div>
                </div>
            </section>
        </div>
    );
}

function CategoryCard({ title, description, icon, image }) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <img
            alt={title}
            className="object-cover w-full h-60"
            height={400}
            src={image}
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width={600}
          />
        </CardHeader>
        <CardContent className="p-4 dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            {icon}
            {title}
          </CardTitle>
          <CardDescription style={{marginLeft: '-4rem'}}>{description}</CardDescription>
        </CardContent>
      </Card>
    );
  }
  
  function FeaturedPostCard({ title, description, image }) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <img
            alt={title}
            className="object-cover w-full h-48"
            height={400}
            src={image}
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width={600}
          />
        </CardHeader>
        <CardContent className="p-4 dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    );
  }
  
  function MountainIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    );
  }

export default Home
