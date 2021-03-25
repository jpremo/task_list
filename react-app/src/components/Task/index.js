import React, { useState } from 'react'
import Collapse from '../CollapseContent'
import Comment from '../Comment'
import { swapStatus } from '../../store/lists'
import './Task.css'
import { useDispatch } from 'react-redux'
//This component wraps information to allow for it to be collapsible
const Task = ({ taskData }) => {
    const dispatch = useDispatch()
    const toggleStatus = async () => {
        await dispatch(swapStatus(taskData))
    }

    return (
        <Collapse title={taskData.title} status={taskData.completed}>
            <div className='task-description'>{taskData.description}</div>
            <div className='task-completion'>
                <label htmlFor='completion-status'>Completed:</label>
                <input name='completion-status' onClick={toggleStatus} type='checkbox' checked={taskData.completed} />
            </div>
            {taskData.comments.map(comment => {
                return (
                    <Comment commentData={comment} key={comment.id} />
                )
            })}
        </Collapse>
    )
}

export default Task
