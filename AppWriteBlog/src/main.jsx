import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store.js'
import { createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
// import AddPost from './pages/AddPost.jsx'
// import Post from './pages/Post.jsx'
// import EditPost from './pages/EditPost.jsx'
// import Signup from './pages/Signup.jsx'
// // import AllPosts from './pages/AllPosts.jsx'
// import ErrorPage from './components/error-page/ErrorPage.jsx'
// import ContactPage from './pages/ContactPage.jsx'
// import AboutUs from './pages/AboutUs.jsx'
// import { AuthLayout, Login } from './components/index.js'
import Home from './pages/Home.jsx'
import Loader from './components/Loader.jsx'

// Lazy load components
const AuthLayout = lazy(() => import('./components/AuthLayout.jsx'));
const Login = lazy(() => import('./components/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const AllPosts = lazy(() => import('./pages/AllPosts.jsx'));
const AddPost = lazy(() => import('./pages/AddPost.jsx'));
const Post = lazy(() => import('./pages/Post.jsx'));
const EditPost = lazy(() => import('./pages/EditPost.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const AboutUs = lazy(() => import('./pages/AboutUs.jsx'));
const ErrorPage = lazy(() => import('./components/error-page/ErrorPage.jsx'));




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

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<App />} errorElement = {<ErrorPage />} >
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<AuthLayout authentication={false}> 
//                 <Login />
//             </AuthLayout>} />
//             <Route path="/signup" element={<AuthLayout authentication={false}> 
//                 <Signup />
//             </AuthLayout>} />
//             <Route 
//                 path="/all-posts" 
//                 element={
//                 <Suspense>
//                     <AuthLayout authentication><AllPosts />{" "}</AuthLayout>
//                 </Suspense>
//             }
//              />
//             <Route path="/add-post" element={<AuthLayout authentication>
//                 {" "}
//                 <AddPost />
//             </AuthLayout>} />
//             <Route path="/contact-us" element={<ContactPage />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/edit-post/:slug" element={<AuthLayout authentication>
//                 {" "}
//                 <EditPost />
//             </AuthLayout>} />
//             <Route path="/post/:slug" element={<Post />} />
//         </Route>
//     )
// )

// Router configuration
const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<Suspense fallback={<Loader text="Loading Error Page..." />}><ErrorPage /></Suspense>}>
        <Route path="/" element={<Home />} /> {/* Eagerly loaded */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader text="Loading Login..." />}>
              <AuthLayout authentication={false}>
                <Login />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loader text="Loading Signup..." />}>
              <AuthLayout authentication={false}>
                <Signup />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/all-posts"
          element={
            <Suspense fallback={<Loader text="Loading All Posts..." />}>
              <AuthLayout authentication>
                <AllPosts />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/add-post"
          element={
            <Suspense fallback={<Loader text="Loading Add Post..." />}>
              <AuthLayout authentication>
                <AddPost />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Suspense fallback={<Loader text="Loading Contact Page..." />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loader text="Loading About Us..." />}>
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="/edit-post/:slug"
          element={
            <Suspense fallback={<Loader text="Loading Edit Post..." />}>
              <AuthLayout authentication>
                <EditPost />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/post/:slug"
          element={
            <Suspense fallback={<Loader text="Loading Post..." />}>
              <Post />
            </Suspense>
          }
        />
      </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={<Loader text={'Redux data persisting...'}/>} persistor={persistor}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
