import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <div>
    {
          [1,2,3,4,].map((item, i) => <Post key={i}/>)
    } 
    </div>
  )
}

export default Posts
