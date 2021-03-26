import React, { useState } from 'react'
import Collapse from '../CollapseContent'
import Comment from '../Comment'
import { deleteTask, swapStatus } from '../../store/lists'
import './Task.css'
import { useDispatch } from 'react-redux'
import { setTaskModal, setCommentModal } from '../../store/modals'

const Task = ({ taskData }) => {
    const dispatch = useDispatch()
    const toggleStatus = async () => {
        await dispatch(swapStatus(taskData))
    }

    return (
        <Collapse title={taskData.title} status={taskData.completed}>
            <div className='basic-button-container'>
                <button className='basic-button' onClick={() => dispatch(setCommentModal(false, taskData))}>Add Comment</button>
                <button className='basic-button' onClick={() => dispatch(setTaskModal(true, taskData))}>Edit Task</button>
                <button className='basic-button' onClick={() => dispatch(deleteTask(taskData))}>Delete Task</button>
            </div>
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
