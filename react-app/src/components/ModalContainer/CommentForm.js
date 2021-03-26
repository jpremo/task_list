import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { closeModal } from '../../store/modals'
import { createComment, updateComment } from '../../store/lists'

const ListForm = ({ editing, editingInfo }) => {
    const [errors, setErrors] = useState([]);
    const [body, setBody] = useState("");
    const dispatch = useDispatch()
    const cancel = (e) => {
        dispatch(closeModal(false))
    }

    useEffect(() => {
        if (editing) {
            setBody(editingInfo.body)
        }
    }, [])

    const submitForm = async (e) => {
        e.preventDefault();
        let res
        if (editing) {
            res = await dispatch(updateComment(editingInfo.id, body))
        } else {
            res = await dispatch(createComment(body, editingInfo.id))
        }
        if (!res.errors) {
            dispatch(closeModal(false))
        } else {
            setErrors(res.errors);
        }
    };

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    return (
        <form onSubmit={submitForm}>
            <h1 className='modal-title'>{editing ? 'Edit Comment' : 'Create Comment'}</h1>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='modal-form-div'>
                <label htmlFor="body">Body</label>
                <textarea
                    className='modal-form-text-area'
                    name="body"
                    placeholder=""
                    value={body}
                    onChange={updateBody}
                    maxLength={200} />
                <div className='word-counter'>{body.length}/200</div>
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
