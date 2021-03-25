import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLists } from '../../store/lists';
import List from '../List'
import './HomePage.css'
const HomePage = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists)
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
            <div id='lists-wrapper'>
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
