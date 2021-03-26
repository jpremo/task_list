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
            <div className='task-content-wrapper'>
                <div className='task-subheader'>Description</div>
                <p className='task-description'>{taskData.description}</p>
            </div>
            <div className='task-content-wrapper'>
                <div className='task-subheader'>Comments</div>
                {taskData.comments.length > 0 && <ul className='task-comments-list'>
                    {taskData.comments.map(comment => {
                        return (
                            <li>
                                <Comment commentData={comment} key={comment.id} />
                            </li>
                        )
                    })}
                </ul>
                }
                {taskData.comments.length === 0 &&
                    <div className='task-no-comments'>There are no comments yet!</div>
                }
            </div>
            <div className='basic-button-container'>
                <button className='basic-button smaller-text' onClick={() => dispatch(setCommentModal(false, taskData))}>Add Comment</button>
                <button className='basic-button smaller-text' onClick={() => dispatch(setTaskModal(true, taskData))}>Edit Task</button>
                <button className='basic-button smaller-text' onClick={() => dispatch(deleteTask(taskData))}>Delete Task</button>
            </div>
            <div className='task-completion'>
                <label htmlFor='completion-status'>Task Completed?</label>
                <input name='completion-status' onClick={toggleStatus} type='checkbox' checked={taskData.completed} />
            </div>
        </Collapse>
    )
}

export default Task
