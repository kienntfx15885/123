import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.scss";

import Button from "~/components/Button";
import Menu from "~/components/Popper/Menu";
import Search from "../../Search";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>Logo</div>

        <Search />

        <div className={cx("action")}>
          <Link to='/add'><Button primary>Thêm nhân viên</Button></Link>

          <Link to='/delete'><Button text>Update</Button></Link>

          <Menu>
            <button className={cx("more-btn")}>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
              />
            </button>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
