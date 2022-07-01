import axiosClient from "./axiosClient"

const staffApi = {
    getAll: (params) => {
        const url = 'staffs'
        return axiosClient.get(url, {params})
    },

    getDepart: (params) => {
        const url = 'departments'
        return axiosClient.get(url, {params})
    },

    getSalary: (params) => {
        const url = 'staffsSalary'
        return axiosClient.get(url, {params})
    },

    postAll: (params) => {
        const url = `/`
        return axiosClient.post(url, {params});
    },
}

export default staffApi;