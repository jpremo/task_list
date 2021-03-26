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
        </div>
    )
}

export default Comment
