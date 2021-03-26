import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../store/lists'
import { setCommentModal } from '../../store/modals'
import './Comment.css'
const Comment = ({ commentData }) => {
    const dispatch = useDispatch()
    return (
        <div className='comment-wrapper'>
            <div className='comment-body'>{commentData.body}</div>
            <div>
                <i class="fas fa-pencil-alt comment-icon" onClick={() => dispatch(setCommentModal(true, commentData))}></i>
                <i class="fas fa-trash-alt comment-icon" onClick={() => dispatch(deleteComment(commentData))}></i>
            </div>
            {/* <div className='basic-button-container'>
                <button className='basic-button' onClick={() => dispatch(setCommentModal(true, commentData))}>Edit Comment</button>
                <button className='basic-button' onClick={() => dispatch(deleteComment(commentData))}>Delete Comment</button>
            </div> */}
        </div>
    )
}

export default Comment
