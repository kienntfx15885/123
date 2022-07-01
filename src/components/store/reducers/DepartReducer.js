

import { useEffect } from "react";
import axios from "axios";

const initialState = {
    list: []
}

const DepartReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOADING_DEPART': {
            const newListDepart = []
            newListDepart.push(...action.payload)
            
            return {
                ...state,
                list: newListDepart,
            }
        }

        case 'ADD_DEPART': {
            const newList = [];
            newList.push(action.payload)
            return {
                ...state,
                list: newList,
            }
        }

        default: {
            return state;
        }
    }
}

export default DepartReducer