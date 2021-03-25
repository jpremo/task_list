import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLists } from '../../store/lists';
import { setListModal } from '../../store/modals';
import List from '../List'
import ModalContainer from '../ModalContainer';
import Modal from '../ModalContainer'
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
            <div>Loading...</div>
        )
    }

    return (
        <div id='homepage-wrapper'>
            <ModalContainer modalType={modals.modalType} editing={modals.editing}>
                <div>test</div>
            </ModalContainer>
            <div id='lists-wrapper'>
                <button className='basic-button' onClick={() => dispatch(setListModal(false))}>Create List</button>
                {lists.map(list => {
                    return (
                        <>
                            <List listData={list} key={list.id} />
                        </>
                    )
                })}
            </div>
        </div>
    );
}

export default HomePage;
