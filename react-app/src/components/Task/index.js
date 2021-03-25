import React, { useState } from 'react'
import Collapse from '../CollapseContent'
import Comment from '../Comment'
import './Task.css'
//This component wraps information to allow for it to be collapsible
const Task = ({ taskData }) => {
    return (
        <Collapse title={taskData.title} status={taskData.complete}>
            <div className='task-description'>{taskData.description}</div>
            {taskData.comments.map(comment => {
                return (
                   <Comment commentData={comment} key={comment.id}/>
                )
            })}
        </Collapse>
    )
}

export default Task
