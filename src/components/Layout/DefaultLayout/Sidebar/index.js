
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss'


const cx = classNames.bind(styles)

function Sidebar() {
    return ( 
        <aside className={cx('wrapper')}>
            <div className={cx('item')}>
                <Link to='/'>
                    Nhân viên
                </Link>
            </div>
            <div className={cx('item')}>
                <Link to='/departments'>
                    Phòng ban
                </Link>
            </div>
            <div className={cx('item')}>
                <Link to='/salary'>
                    Bảng lương
                </Link>
            </div>
        </aside>
     );
}

export default Sidebar;