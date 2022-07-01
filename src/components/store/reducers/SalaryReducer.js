

const initialState = {
    list: []
}

const SalaryReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOADING_SALARY': {
            const newListSalary = []
            newListSalary.push(...action.payload)
            return {
                ...state,
                list: newListSalary,
            }
        }

        default: {
            return state;
        }
    }
}

export default SalaryReducer