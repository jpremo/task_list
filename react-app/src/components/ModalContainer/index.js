import React from 'react';
import './ModalContainer.css'
import ListForm from './ListForm'
const ModalContainer = ({ modalType, editing}) => {
    if (modalType) {
        return (
            <div className='modal-box-wrapper'>
                <div className='modal-box'>
                    {modalType === 'list' &&
                        <ListForm editing={editing}/>
                    }
                    {/* {modalType === 'task' &&
                        <TaskForm editing={editing} />
                    }
                    {modalType === 'comment' &&
                        <CommentForm editing={editing} />
                    } */}
                </div>
            </div>
        );
    }
    return null
}

export default ModalContainer;
