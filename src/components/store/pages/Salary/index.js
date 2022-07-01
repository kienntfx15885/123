import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Salary.module.scss";

const cx = classNames.bind(styles);

function Salary() {

  const salaryList = useSelector((state) => state.salary.list);

  return (
    <div className={cx("wrapper")}>
      <h1>Bảng lương</h1>
      <div className="grid wide">
        <div className="row">
          {salaryList.map((staff) => {
            return (
              <div key={staff.id} className="col l-4 m-6 c-12">
                <div className={cx("salaryDiv")}>
                  <h1>{staff.name}</h1>
                  <p className={cx("staffId")}>Mã nhân viên: {staff.id}</p>
                  <p>Hệ số lương: {staff.salaryScale}</p>
                  <p>Số ngày làm thêm: {staff.overTime || "Không có"}</p>
                  <p>Lương: {parseInt(staff.salary) || "chưa có"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Salary;
