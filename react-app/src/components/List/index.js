import React, { useState } from 'react'
import Collapse from '../CollapseContent'
import Task from '../Task'
import { setListModal, setTaskModal, deleteModal } from '../../store/modals'
import { useDispatch } from 'react-redux'
import { deleteList } from '../../store/lists'
import './List.css'

const List = ({ listData }) => {
    const dispatch = useDispatch()
    return (
        <div className='list-wrapper'>
            <Collapse title={listData.title} collapsedInit={false} largerText={true} displayStatus={false}>
                {listData.tasks.length === 0 &&
                    <div className='list-no-task-text'>There are no tasks in this list!</div>
                }
                {listData.tasks.map(task => {
                    return (
                        <Task taskData={task} key={task.id} />
                    )
                })}
                <div className='basic-button-container'>
                    <button className='basic-button' onClick={() => dispatch(setTaskModal(false, listData))}>Add Task</button>
                    <button className='basic-button' onClick={() => dispatch(setListModal(true, listData))}>Edit List</button>
                    <button className='basic-button' onClick={() => dispatch(deleteModal('list', listData))}>Delete List</button>
                </div>
            </Collapse>
        </div>
    )
}

export default List
