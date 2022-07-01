

export const addNewDepart = (depart) => {
    return {
        type: 'ADD_DEPART',
        payload: depart,
    }
}

export const setLoadingDepart = (depart) => {
    return {
        type: 'LOADING_DEPART',
        payload: depart,
    }
}

export const findDepart = (depart) => {
    return {
        type: 'FIND_DEPART',
        payload: depart,
    }
}