
import styles from './Home.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import StaffList from './StaffList';
import {setLoadingStaff } from '../../actions/StaffAction';
import { useEffect, useState } from 'react';
import staffApi from '~/api/staffApi';
import { setLoadingDepart } from '../../actions/DepartAction';
import { setLoadingSalary } from '../../actions/SalaryAction';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import axios from 'axios';


const cx = classNames.bind(styles)

function Home () {

    const staffList = useSelector(state => state.staff.list);
    const departList = useSelector(state => state.depart.list);

    const dispatch = useDispatch()

    const handleGet =() => {
        const fetchStaffList = async () => {
            try {
                const response = await staffApi.getAll();
                if (!!departList) {
                    response.data.map(staff => {
                        const departOfStaff = departList.find(depart => {
                            return depart.id === staff.departmentId
                        })
                        if (!!departOfStaff) {
                            staff.departName = departOfStaff.name 
                        }  
                    })
                }

                const action = setLoadingStaff(response.data)
                dispatch(action)
            } catch (error) {
                console.log('Error', error)
            }
        }

        fetchStaffList();
    }

    useEffect(() => {
        const fetchDepartList = async () => {
            try {
                const response = await staffApi.getDepart();
                const action = setLoadingDepart(response.data)
                dispatch(action)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        fetchDepartList();
    }, [staffApi])

    useEffect(() => {
        const fetchSalaryList = async () => {
            try {
                const response = await staffApi.getSalary();
                const action = setLoadingSalary(response.data)
                dispatch(action)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        fetchSalaryList();
    }, [staffApi])

    return ( 
        <div>
            <div className={cx('title')}>
                <Link to="/" onClick={handleGet}>
                    Toàn bộ nhân viên
                </Link>
            </div>
            <StaffList onHandleDelete={handleGet}/>
        </div>
    );
}

export default Home ;