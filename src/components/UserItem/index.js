import classNames from "classnames/bind";
import styles from "./UserItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function UserItem({data}) {
  
  return (
    <Link to={`/staffs/${data.id}`}>
      <div className={cx("wrapper")}>
        <img className={cx("avatar")} src={images.alberto} alt="Ảnh nhân viên" />
        <div className={cx("info")}>
          <h4 className={cx("name")}>
            <span>{data.name}</span>
            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
          </h4>
          <span className={cx("user-depart")}>Phòng ban: {data.departName}</span>
        </div>
      </div>
    </Link>
  );
}

export default UserItem;
