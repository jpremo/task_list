import React from 'react';
import './ModalContainer.css'
import ListForm from './ListForm'
import TaskForm from './TaskForm'
import CommentForm from './CommentForm'
const ModalContainer = ({ modalType, editing, editingInfo}) => {
    if (modalType) {
        return (
            <div className='modal-box-wrapper'>
                <div className='modal-box'>
                    {modalType === 'list' &&
                        <ListForm editing={editing} editingInfo={editingInfo}/>
                    }
                    {modalType === 'task' &&
                        <TaskForm editing={editing} editingInfo={editingInfo}/>
                    }
                    {modalType === 'comment' &&
                        <CommentForm editing={editing} editingInfo={editingInfo}/>
                    }
                </div>
            </div>
        );
    }
    return null
}

export default ModalContainer;
