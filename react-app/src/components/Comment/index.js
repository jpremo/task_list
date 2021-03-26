import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../store/lists'
import { setCommentModal } from '../../store/modals'

const Comment = ({ commentData }) => {
    const dispatch = useDispatch()
    return (
        <>
        <div>{commentData.body}</div>
            <div className='basic-button-container'>
                <button className='basic-button' onClick={() => dispatch(setCommentModal(true, commentData))}>Edit Comment</button>
                <button className='basic-button' onClick={() => dispatch(deleteComment(commentData))}>Delete Comment</button>
            </div>
        </>
    )
}

export default Comment
