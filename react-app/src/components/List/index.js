import React, { useState } from 'react'
import Collapse from '../CollapseContent'
import Task from '../Task'
//This component wraps information to allow for it to be collapsible
const List = ({ listData }) => {
    return (
        <Collapse title={listData.title} collapsedInit={false} largerText={true} displayStatus={false}>
            <div className='basic-button-container'>
                <button className='basic-button' >Add Task</button>
                <button className='basic-button'>Edit List</button>
                <button className='basic-button'>Delete List</button>
            </div>
            {listData.tasks.map(task => {
                return (
                    <Task taskData={task} key={task.id} />
                )
            })}
        </Collapse>
    )
}

export default List
