

export const addNewStaff = (staff) => {
    return {
        type: 'ADD_STAFF',
        payload: staff,
    }
}

export const setLoadingStaff = (staff) => {
    return {
        type: 'LOADING_STAFF',
        payload: staff,
    }
}

export const findDepartStaff = (departName) => {
    return {
        type: 'FIND_DEPART_STAFF',
        payload: departName,
    }
}