import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import { AuthLayout, Login } from './components/index.js'
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import ErrorPage from './components/error-page/ErrorPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AboutUs from './pages/AboutUs.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//         {
//             path: "/",
//             element: <Home />,
//         },
//         {
//             path: "/login",
//             element: (
//                 <AuthLayout authentication={false}>
//                     <Login />
//                 </AuthLayout>
//             ),
//         },
//         {
//             path: "/signup",
//             element: (
//                 <AuthLayout authentication={false}>
//                     <Signup />
//                 </AuthLayout>
//             ),
//         },
//         {
//             path: "/all-posts",
//             element: (
//                 <AuthLayout authentication>
//                     {" "}
//                     <AllPosts />
//                 </AuthLayout>
//             ),
//         },
//         {
//             path: "/add-post",
//             element: (
//                 <AuthLayout authentication>
//                     {" "}
//                     <AddPost />
//                 </AuthLayout>
//             ),
//         },
//         {
//             path: "/edit-post/:slug",
//             element: (
//                 <AuthLayout authentication>
//                     {" "}
//                     <EditPost />
//                 </AuthLayout>
//             ),
//         },
//         {
//             path: "/post/:slug",
//             element: <Post />,
//         },
//     ],
//   },
// ])

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement = {<ErrorPage />} >
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthLayout authentication={false}> 
                <Login />
            </AuthLayout>} />
            <Route path="/signup" element={<AuthLayout authentication={false}> 
                <Signup />
            </AuthLayout>} />
            <Route path="/all-posts" element={<AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>} />
            <Route path="/add-post" element={<AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/edit-post/:slug" element={<AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>} />
            <Route path="/post/:slug" element={<Post />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
