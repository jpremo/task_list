import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/modals'
import { createList, updateList } from '../../store/lists'

//login form component; used inside of ModalContainer
const ListForm = ({ editing }) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const dispatch = useDispatch()
    const cancel = (e) => {
        dispatch(closeModal(false))
    }

    const submitForm = async (e) => {
        e.preventDefault();
        debugger
        let res
        if(editing){
            res = await dispatch(updateList(title))
        }else {
            res = await dispatch(createList(title))
        }

        if (!res.errors) {
            dispatch(closeModal(false))
        } else {
            setErrors(res.errors);
        }
    };

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    return (
        <form onSubmit={submitForm}>
            <h1 className='modal-title'>{editing ? 'Edit List' : 'Create List'}</h1>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='modal-form-div'>
                <label htmlFor="title">Title</label>
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={updateTitle}
                />
            </div>
                <div className='modal-button-box'>
                    <div className='modal-link-div'>
                        <div className='modal-link modal-button' onClick={submitForm}>Submit</div>
                    </div>
                    <div className='modal-link-div'>
                        <div className='modal-link modal-button' onClick={cancel}> Close</div>
                    </div>
                </div>
        </form >
    );
};

export default ListForm;
