
import classNames from "classnames/bind";
import styles from './StaffList.module.scss'
import { Link } from "react-router-dom";
import images from "~/assets/images";
import { useSelector } from "react-redux";
import axios from "axios";

const cx = classNames.bind(styles)

function StaffList({onHandleDelete}) {

  const staffList = useSelector(state => state.staff.list)
  
  return (
    <div className="row">
      {staffList.map((staff) => {
        const id = staff.id;
        const handleDelete = async () => {
          try {
            const response = await axios.delete(
              `https://nodejstesthatn.herokuapp.com/staffs/${id}`,
            );
            
          } catch {
            alert("loi");
          }
          onHandleDelete();
      
        };
        return (
          <div className={"col l-4 wrapper"} key={staff.id}>
            <div className={cx('container')}>
              <Link to={`/staffs/${staff.id}`} className={cx("userName")}>
                <div className={cx("divUser")}>
                  <img src={images.alberto} alt="" className={cx("imgStaff")} />
                  <span className={cx("linkUser")}>{staff.name}</span>
                </div>
              </Link>
              <button onClick={handleDelete} className={cx('btn-delete')}>X</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StaffList;
