
import classNames from "classnames/bind";
import styles from './PatchItem.module.scss'
import images from "~/assets/images";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles)


function PatchItem({data, onClick}) {

  const departList = useSelector(state => state.depart.list)

  const departName = departList.find(depart => {
    return depart.id === data.departmentId
  })

  return (
    <div onClick={() => onClick()}>
      <div className={cx("wrapper")}>
        <img
          className={cx("avatar")}
          src={images.alberto}
          alt="Ảnh nhân viên"
        />
        <div className={cx("info")}>
          <h4 className={cx("name")}>
            <span>{data.name}</span>
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          </h4>
          <span className={cx("user-depart")}>
            Phòng ban: {departName.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PatchItem;
