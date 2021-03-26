import React, { useState } from 'react'
import Collapse from '../CollapseContent'
import Comment from '../Comment'
import { deleteTask, swapStatus } from '../../store/lists'
import './TitleBar.css'
import { useDispatch } from 'react-redux'
import { setListModal } from '../../store/modals';
import { setTaskModal, setCommentModal } from '../../store/modals'

const TitleBar = ({ taskData }) => {
    const dispatch = useDispatch()

    return (
        <div className='title-bar'>
            <div>Your To Do List</div>
            <button className='basic-button' onClick={() => dispatch(setListModal(false))}>Create List</button>
        </div>
    )
}

export default TitleBar
