const UPDATELISTS = '/lists/updatelists'
const EDITTASK = '/lists/editTask'
const ADDLIST = '/lists/addList'
const EDITLIST = '/lists/editList'
const DELETELIST = '/lists/deleteList'
const ADDTASK = '/lists/addTask'
const DELETETASK = '/lists/deleteTask'
const ADDCOMMENT = '/lists/addComment'
const EDITCOMMENT = '/lists/editComment'
const DELETECOMMENT = '/lists/deleteComment'

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

const removeTask = (data) => ({
    type: DELETETASK,
    payload: data
});

const addComment = (data, listId) => ({
    type: ADDCOMMENT,
    payload: data
});

const editComment = (data) => ({
    type: EDITCOMMENT,
    payload: data
});

const removeComment = (data) => ({
    type: DELETECOMMENT,
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

export const deleteTask = (task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(removeTask(task));
        return data
    } else {
        return data
    }
};

export const createComment = (body, task) => async (dispatch) => {
    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body,
            taskId: task
        })
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(addComment(data));
        return data
    } else {
        return data
    }
};

export const updateComment = (id, body) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body
        })
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(editComment(data));
        return data
    } else {
        return data
    }
};

export const deleteComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
    });;
    const data = await response.json()
    if (response.ok) {
        dispatch(removeComment(comment));
        return data
    } else {
        return data
    }
};

const initialState = [];

function reducer(state = initialState, action) {
    let newState;
    let idx, idx1, idx2, idx3
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
            idx1 = newState.findIndex((list) => list.id === action.payload.listId)
            idx2 = newState[idx1].tasks.findIndex((task) => task.id === action.payload.id)
            newState[idx1].tasks[idx2] = action.payload
            return newState;
        case DELETETASK:
            newState = [...state]
            idx = newState.findIndex((list) => list.id === action.payload.listId)
            newState[idx].tasks = newState[idx].tasks.filter((task) => task.id !== action.payload.id)
            return newState;
        case ADDCOMMENT:
            newState = [...state]
            idx1 = newState.findIndex((list) => list.id === action.payload.listId)
            idx2 = newState[idx1].tasks.findIndex((task) => task.id === action.payload.taskId)
            newState[idx1].tasks[idx2].comments.push(action.payload)
            return newState;
        case EDITCOMMENT:
            newState = [...state]
            idx1 = newState.findIndex((list) => list.id === action.payload.listId)
            idx2 = newState[idx1].tasks.findIndex((task) => task.id === action.payload.taskId)
            idx3 = newState[idx1].tasks[idx2].comments.findIndex((comment) => comment.id === action.payload.id)
            newState[idx1].tasks[idx2].comments[idx3] = action.payload
            return newState;
        case DELETECOMMENT:
            newState = [...state]
            idx1 = newState.findIndex((list) => list.id === action.payload.listId)
            idx2 = newState[idx1].tasks.findIndex((task) => task.id === action.payload.taskId)
            newState[idx1].tasks[idx2].comments = newState[idx1].tasks[idx2].comments.filter((comment) => comment.id !== action.payload.id)
            return newState;
        default:
            return state;
    }
}

export default reducer;
