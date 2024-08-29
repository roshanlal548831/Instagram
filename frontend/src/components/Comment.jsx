import { comment } from 'postcss'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({comment}) => {
    
  return (
    <div className='my-2'>
        <div className='flex items-center'>
            <Avatar className=" flex  gap-3 items-center">
                <AvatarImage src={comment?.author?.profilePicture}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='font-bold text-sm ml-2'>{comment?.author?.username}<span className='font-normal pl-1'>{comment?.text}</span></h1>
        </div>
    </div>
  )
}

export default Comment