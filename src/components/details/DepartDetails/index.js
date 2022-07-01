import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./DepartDetails.module.scss";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import { useState, useEffect } from "react";
import axios from "axios";
import staffApi from "~/api/staffApi";
import { setLoadingDepart } from "~/components/store/actions/DepartAction";
import { setLoadingStaff } from "~/components/store/actions/StaffAction";

const cx = classNames.bind(styles);

function DepartDetails({ id }) {
  const [departName, setDepartName] = useState("");

  const staffList = useSelector((state) => state.staff.list);
  const departList = useSelector((state) => state.depart.list);

  const dispatch = useDispatch();

  useEffect(() => {
    setDepartName(departList[id].name);
  }, [id]);

  const listStaffs = staffList.filter((staff) => {
    return departName == staff.departName;
  });

  return (
    <div className={cx("container")}>
      <h1>Nhân sự thuộc phòng {departName}</h1>
      <div className="grid wide">
        <div className="row">
          {listStaffs.map((staff) => {
            const id = staff.id;
            const handleDelete = async () => {
              try {
                const response = await axios.delete(
                  `https://nodejstesthatn.herokuapp.com/staffs/${id}`
                );
              } catch {
                alert("loi");
              }

              const fetchDepartList = async () => {
                try {
                  const response = await staffApi.getDepart();
                  const action = setLoadingDepart(response.data);
                  dispatch(action);
                } catch (error) {
                  console.log("Error: ", error);
                }
              };

              const fetchStaffList = async () => {
                try {
                  const response = await staffApi.getAll();
                  if (!!departList) {
                    response.data.map((staff) => {
                      const departOfStaff = departList.find((depart) => {
                        return depart.id === staff.departmentId;
                      });
                      if (departOfStaff) {
                        staff.departName = departOfStaff.name;
                      }
                    });
                  }

                  const action = setLoadingStaff(response.data);
                  dispatch(action);
                } catch (error) {
                  console.log("Error", error);
                }
              };

              fetchStaffList();

              fetchDepartList();
            };
            return (
              <div className="col l-4 wrapper" key={staff.id}>
                <div className={cx("container")}>
                  <Link to={`/staffs/${staff.id}`} className={cx("userName")}>
                    <div className={cx("divUser")}>
                      <img
                        src={images.alberto}
                        alt=""
                        className={cx("imgStaff")}
                      />
                      <span className={cx("linkUser")}>{staff.name}</span>
                    </div>
                  </Link>
                  <Link to={`/departments`}>
                    <button onClick={handleDelete} className={cx("btn-delete")}>
                      X
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DepartDetails;
