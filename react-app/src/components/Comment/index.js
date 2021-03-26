import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCommentModal } from '../../store/modals'

//This component wraps information to allow for it to be collapsible
const Comment = ({ commentData }) => {
    const dispatch = useDispatch()
    return (
        <>
        <div>{commentData.body}</div>
            <div className='basic-button-container'>
                <button className='basic-button' onClick={() => dispatch(setCommentModal(true, commentData))}>Edit Comment</button>
                {/* <button className='basic-button' onClick={() => dispatch(deleteTask(taskData))}>Delete Comment</button> */}
            </div>
        </>
    )
}

export default Comment
