import React, { useState } from 'react'
import Collapse from '../CollapseContent'
import Task from '../Task'
import { setListModal, setTaskModal } from '../../store/modals'
import { useDispatch } from 'react-redux'
import { deleteList } from '../../store/lists'
import './List.css'

const List = ({ listData }) => {
    const dispatch = useDispatch()
    return (
        <div className='list-wrapper'>
            <Collapse title={listData.title} collapsedInit={false} largerText={true} displayStatus={false}>
                <div className='basic-button-container'>
                    <button className='basic-button' onClick={() => dispatch(setTaskModal(false, listData))}>Add Task</button>
                    <button className='basic-button' onClick={() => dispatch(setListModal(true, listData))}>Edit List</button>
                    <button className='basic-button' onClick={() => dispatch(deleteList(listData.id))}>Delete List</button>
                </div>
                {listData.tasks.map(task => {
                    return (
                        <Task taskData={task} key={task.id} />
                    )
                })}
            </Collapse>
        </div>
    )
}

export default List
