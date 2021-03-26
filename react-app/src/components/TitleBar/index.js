import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Collapse from '../CollapseContent'
import Comment from '../Comment'
import { deleteTask, swapStatus } from '../../store/lists'
import './TitleBar.css'
import { useDispatch } from 'react-redux'
import { setListModal } from '../../store/modals';
import logo from './toDoLogo.png'
import { setTaskModal, setCommentModal } from '../../store/modals'

const TitleBar = ({ taskData }) => {
    const dispatch = useDispatch()

    return (
        <div className='title-bar'>
            <NavLink to="/" exact>
                <img className='title-bar-logo' src={logo} />
            </NavLink>
            <button className='basic-button' onClick={() => dispatch(setListModal(false))}>Create List</button>
        </div>
    )
}

export default TitleBar
