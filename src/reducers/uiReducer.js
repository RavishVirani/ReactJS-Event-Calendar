import types from '../types/types';
const initialState = {
    isOpenModal: false
}

export const uiReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case types.uiOpenModal:
        return { ...state, isOpenModal: true}
    case types.uiCloseModal:
        return { ...state, isOpenModal: false}
    default:
        return state
    }
}
export default uiReducer;
