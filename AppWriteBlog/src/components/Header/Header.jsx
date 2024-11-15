import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import { Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate,NavLink } from 'react-router-dom'
import ThemeBtn from '../ThemeBtn'
import { useDispatch } from 'react-redux'
import { setSearchterm, clearSearchTerm } from '../../store/searchSlice'
import Signup from '../../pages/Signup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

function Header() {

  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  console.log(authStatus, userData);

  const dispatch = useDispatch();
  const [searchTermLocal, setSearchTermLocal] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTermLocal(searchTerm);
    // console.log(`term is: ${searchTerm}`);
    
    if (searchTerm.trim() !== "") {
      dispatch(setSearchterm({ searchTerm }));  // Dispatch the search term to Redux
    } else {
      dispatch(clearSearchTerm());  // Clear search term if input is empty
    }
  };

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    // {
    //   name: "Login",
    //   slug: "/login",
    //   active: !authStatus,     //if user is logged in then don't show login/signup option to the use
    // },
    // {
    //     name: "Signup",
    //     slug: "/signup",
    //     active: !authStatus,
    // },
    {
        name: "Blogs",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Blog",
        slug: "/add-post",
        active: authStatus,
    },
    // {
    //     name: "Contact",
    //     slug: "/contact-us",
    //     active: true,
    // },
    {
      name: "AboutUs",
      slug: "/about",
      active: true,
  },
  ]

  return (
    // <div className="w-full bg-white border border-gray-200 shadow-lg dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-2 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
            <Link to="/" className="flex items-center">
                <Logo />
            </Link>
          
            <div className="flex items-center lg:order-2"> 
              <ThemeBtn />
              {authStatus && (    //if authStatus is true, means user is logged in then show logout button
                <LogoutBtn />
              )}
              {authStatus && (
                <div className="user-profile">
                  {/* Font Awesome User Icon */}
                  <FontAwesomeIcon icon={faUser} className="user-icon" />
                  {/* User Name */}
                  <span className="user-name">{userData?.name}</span>
                </div>
              )}
              {!authStatus && (
                <NavLink  
                to="/login"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium cursor-pointer text-white px-3 py-3 transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:shadow-md hover:scale-105 hover:text-white mr-2"
                style={{ lineHeight: '0.75rem', background: '#9c99ff' }}
                > 
                Login
                </NavLink>
              )} 
              {!authStatus && (
                <NavLink  
                to="/signup"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium cursor-pointer bg-blue-700 text-white px-3 py-3 transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:shadow-md hover:scale-105 hover:text-white"
                style={{ lineHeight: '0.75rem' }}
                > 
                Signup
                </NavLink>
              )} 
            </div>
             
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                {navItems.map((item) => 
                  item.active ? (
                    <li key={item.name}>
                      <NavLink
                        style={{fontSize: 'large'}}
                        to={item.slug}
                        className={({isActive}) =>
                          `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : 
                            "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 
                            lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                        >{item.name}
                      </NavLink>
                    </li>
                  ) : null
                )}
              </ul>
              <div className="search-bar ml-4">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTermLocal}
                  onChange={handleInputChange}
                />
              </div>
              {/* CSS styling for search bar */}
              <style>{`
                .search-bar input {
                  width: 16rem;
                  padding: 8px;
                  font-size: 14px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
              `}</style>
            </div>
          </div>
      </nav>
    </header>
    // </div>
  )
}

export default Header
