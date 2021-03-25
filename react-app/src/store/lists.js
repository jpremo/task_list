const UPDATELISTS = '/lists/updatelists'
const EDITTASK = '/lists/editTask'
const ADDLIST = '/lists/addList'

const updateLists = (data) => ({
    type: UPDATELISTS,
    payload: data
});

const editTask = (data) => ({
    type: EDITTASK,
    payload: data
});

const addList = (data) => ({
    type: ADDLIST,
    payload: data
});

export const loadLists = () => async (dispatch) => {
    const response = await fetch('/api/lists/');
    if (response.ok) {
        const data = await response.json()
        dispatch(updateLists(data.lists));
    }
};

export const swapStatus = (task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: task.title,
            completed: !task.completed,
            description: task.description
        })
    });;
    if (response.ok) {
        const data = await response.json()
        dispatch(editTask(data));
    }
};

export const createList = (title) => async (dispatch) => {
    const response = await fetch(`/api/lists/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title
        })
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(addList(data));
        return data
    } else {
        return data.errors
    }
};

export const updateList = (title) => async (dispatch) => {
    const response = await fetch(`/api/lists/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title
        })
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(addList(data));
        return data
    } else {
        return data.errors
    }
};

const initialState = [];

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case UPDATELISTS:
            newState = action.payload
            return newState;
        case EDITTASK:
            newState = [...state]
            let idx1 = newState.findIndex((list) => list.id === action.payload.listId)
            let idx2 = newState[idx1].tasks.findIndex((task) => task.id === action.payload.id)
            newState[idx1].tasks[idx2] = action.payload
            return newState;
        case ADDLIST:
            newState = [...state]
            newState.push(action.payload)
            return newState;
        default:
            return state;
    }
}

export default reducer;
