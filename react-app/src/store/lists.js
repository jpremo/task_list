const UPDATELISTS = '/lists/updatelists'
const EDITTASK = '/lists/editTask'
const ADDLIST = '/lists/addList'
const EDITLIST = '/lists/editList'
const DELETELIST = '/lists/deleteList'
const ADDTASK = '/lists/addTask'

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

const editList = (data) => ({
    type: EDITLIST,
    payload: data
});

const removeList = (data) => ({
    type: DELETELIST,
    payload: data
});

const addTask = (data) => ({
    type: ADDTASK,
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
        return data
    }
};

export const updateList = (id, title) => async (dispatch) => {
    const response = await fetch(`/api/lists/${id}`, {
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
        dispatch(editList(data));
        return data
    } else {
        return data
    }
};

export const deleteList = (id) => async (dispatch) => {
    const response = await fetch(`/api/lists/${id}`, {
        method: 'DELETE',
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(removeList(data.id));
        return data
    } else {
        return data
    }
};

export const createTask = (title, description, listId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            listId
        })
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(addTask(data));
        return data
    } else {
        return data
    }
};

export const updateTask = (id, title, description, completed) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            completed
        })
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(editTask(data));
        return data
    } else {
        return data
    }
};

const initialState = [];

function reducer(state = initialState, action) {
    let newState;
    let idx
    switch (action.type) {
        case UPDATELISTS:
            newState = action.payload
            return newState;
        case ADDLIST:
            newState = [...state]
            newState.push(action.payload)
            return newState;
        case EDITLIST:
            newState = [...state]
            idx = newState.findIndex((list) => list.id === action.payload.id)
            newState[idx] = action.payload
            return newState;
        case DELETELIST:
            newState = [...state]
            newState = newState.filter((list) => list.id !== action.payload)
            return newState;
        case ADDTASK:
            newState = [...state]
            idx = newState.findIndex((list) => list.id === action.payload.listId)
            newState[idx].tasks.push(action.payload)
            return newState;
        case EDITTASK:
            newState = [...state]
            let idx1 = newState.findIndex((list) => list.id === action.payload.listId)
            let idx2 = newState[idx1].tasks.findIndex((task) => task.id === action.payload.id)
            newState[idx1].tasks[idx2] = action.payload
            return newState;
        default:
            return state;
    }
}

export default reducer;
