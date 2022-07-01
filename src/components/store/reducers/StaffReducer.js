
const initialState = {
    list: [],
    departList: []
}

const StaffReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOADING_STAFF': {
            const newList = []
            newList.push(...action.payload)
            return {
                ...state,
                list: newList,
            }
        }

        case 'ADD_STAFF': {
            const newList = [];
            newList.push(action.payload)
            return {
                ...state,
                list: newList,
            }
        }

        case 'FIND_DEPART_STAFF': {
            return state;
        }

        default: {
            return state;
        }
    }
}

export default StaffReducer