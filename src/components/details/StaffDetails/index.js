import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./StaffDetails.module.scss";
import dateFormat from "dateformat";
import images from "~/assets/images";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function StaffDetails(id) {
  const staffList = useSelector((state) => state.staff.list);

  const staffInfo = staffList.find((staff) => {
    return staff.id === id.id;
  });

  return (
    <div>
      <div className={cx("title")}>
        <Link to="/" className={cx("title-link")}>
          Nhân viên
        </Link>
        <span> / </span>
        <span>{staffInfo.name}</span>
      </div>
      <div className={cx("wrapper")}>
        <img src={images.alberto} className={cx("bigImg")} />
        <div className={cx("objDiv")}>
          <h1 className={cx("objName")}>{staffInfo.name}</h1>
          <h3>Ngày sinh: {dateFormat(staffInfo.doB, "dd/mm/yyyy")}</h3>
          <h3>
            Ngày vào công ty: {dateFormat(staffInfo.startDate, "dd/mm/yyyy")}
          </h3>
          <h3>
            Phòng ban:{" "}
            {staffInfo.departName ||
              staffInfo.department ||
              staffInfo.departName}
          </h3>
          <h3>Số ngày nghỉ còn lại: {staffInfo.annualLeave || "Không có"}</h3>
          <h3>Số ngày đã làm thêm: {staffInfo.overTime || "Không có"}</h3>
        </div>
      </div>
    </div>
  );
}

export default StaffDetails;
