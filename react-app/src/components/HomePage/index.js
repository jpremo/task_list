import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {loadLists} from '../../store/lists';

const HomePage = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            await dispatch(loadLists());
            setLoaded(true);
        })();
    }, []);

    if(!loaded) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>Home</div>
    );
}

export default HomePage;
