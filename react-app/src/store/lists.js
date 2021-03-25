const UPDATELISTS = '/lists/updatelists'

const updateLists = (data) => ({
    type: UPDATELISTS,
    payload: data
});

export const loadLists = () => async (dispatch) => {
    const response = await fetch('/api/lists');
    if (response.ok) {
        const data = await response.json()
        dispatch(updateLists(data.lists));
    }
};

const initialState = { lists: undefined };

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case UPDATELISTS:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state;
    }
}

export default reducer;