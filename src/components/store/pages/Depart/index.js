import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from './Depart.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function Depart () {

  const departList = useSelector((state) => state.depart.list);

  return (
    <div>
      <h1>Phòng ban</h1>
      <div className="grid wide">
        <div className="row">
          {departList.map((depart, index) => {
            return (
              <Link to={`/departments/${index}`} className="col l-6" key={depart.id}>
                <div  className={cx("departDiv")}>
                  <h1>{depart.name}</h1>
                  <p className={cx("departNum")}>
                    Số lượng nhân viên: {depart.numberOfStaff}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Depart;
