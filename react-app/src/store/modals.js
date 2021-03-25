const EDITMODAL = '/modals/editModal'

export const setListModal = (editingBool) => ({
    type: EDITMODAL,
    payload: { modalType: 'list', editing: editingBool }
});

export const setLTaskModal = (editingBool) => ({
    type: EDITMODAL,
    payload: { modalType: 'task', editing: editingBool }
});

export const setCommentModal = (editingBool) => ({
    type: EDITMODAL,
    payload: { modalType: 'comment', editing: editingBool }
});

export const closeModal = () => ({
    type: EDITMODAL,
    payload: { modalType: null, editing: false }
});

const initialState = {modalType: null, editing:false};

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case EDITMODAL:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state;
    }
}

export default reducer;
