import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLists } from '../../store/lists';
import { setListModal } from '../../store/modals';
import List from '../List'
import ModalContainer from '../ModalContainer';
import './HomePage.css'
const HomePage = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists)
    const modals = useSelector(state => state.modals)
    useEffect(() => {
        (async () => {
            await dispatch(loadLists());
            setLoaded(true);
        })();
    }, []);

    if (!loaded || !lists) {
        return (
            null
        )
    }

    return (
        <div id='homepage-wrapper'>
            <ModalContainer modalType={modals.modalType} editing={modals.editing} editingInfo={modals.editingInfo}>
                <div>test</div>
            </ModalContainer>
                {/* <button className='basic-button' onClick={() => dispatch(setListModal(false))}>Create List</button> */}
            <div id='lists-wrapper'>
                {lists.map(list => {
                    return (
                        <>
                            <List listData={list} key={list.id} />
                        </>
                    )
                })}
                {lists.length === 0 &&
                    <div className='no-list'>There are no remaining task lists!</div>
                }
            </div>
        </div>
    );
}

export default HomePage;
