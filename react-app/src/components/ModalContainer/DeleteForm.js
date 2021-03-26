import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/modals'
import { deleteList, deleteTask, deleteComment } from '../../store/lists'

const DeleteForm = () => {
    const modals = useSelector(state => state.modals)
    const [body, setBody] = useState("");
    const dispatch = useDispatch()
    const cancel = (e) => {
        dispatch(closeModal(false))
    }

    const submitForm = async (e) => {
        e.preventDefault();
        let res
        if(modals.deleteType === 'list') {
            res = await dispatch(deleteList(modals.deleteInfo.id))
        } else if(modals.deleteType === 'task') {
            res = await dispatch(deleteTask(modals.deleteInfo))
        } else if(modals.deleteType === 'comment') {
            res = await dispatch(deleteComment(modals.deleteInfo))
        }
        if (!res.errors) {
            dispatch(closeModal(false))
        }
    };

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    return (
        <form onSubmit={submitForm}>
            <h1 className='modal-confirm'>Are you sure you want to delete this {modals.deleteType}?</h1>
            <div className='modal-button-box'>
                <div className='modal-link-div'>
                    <div className='modal-link modal-button' onClick={submitForm}>Confirm</div>
                </div>
                <div className='modal-link-div'>
                    <div className='modal-link modal-button' onClick={cancel}> Cancel</div>
                </div>
            </div>
        </form >
    );
};

export default DeleteForm;
