import React from 'react'
// import service from '../appwrite/config'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
import parse from "html-react-parser";

function PostCard({$id, title, content, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className='text-black'>
        <div className="w-full text-center border-[1px] border-[#eaeaea]">
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
            </div>
            <div>
              <h2 className='text-lg font-bold'>{title}</h2>
              <div>
                <p>{parse(content.substring(0, 100))}...</p> {/* Limit content */}
              </div>
            </div>
        </div>
    </Link>
  )
}

export default PostCard
