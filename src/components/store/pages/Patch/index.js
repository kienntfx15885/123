import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Patch.module.scss";
import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setLoadingStaff } from "../../actions/StaffAction";
import { Link } from "react-router-dom";
import UserItem from "~/components/UserItem";
import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import PatchItem from "./PatchItem";
import dateFormat from "dateformat";

const cx = classNames.bind(styles);

function Patch() {
  const staffList = useSelector((state) => state.staff.list);
  const departList = useSelector((state) => state.depart.list);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [doB, setDoB] = useState("");
  const [startDate, setStartDate] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [overTime, setOverTime] = useState("");
  const [salaryScale, setSalaryScale] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const [resultPatch, setResultPatch] = useState({});

  const inputRef = useRef();

  useEffect(() => {
    {
      if (searchValue.length > 0) {
        setShowResult(true);
        const c = staffList.filter((staff) => {
          const a = staff.name;
          const b = a.indexOf(`${searchValue}`, 0);

          return b > -1;
        });

        setSearchResult([...c]);
      }
    }
  }, [searchValue]);

  

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleSubmit = async () => {
    const changeStaff = {
      id: "" || resultPatch.id,
      name: "",
      doB: "",
      startDate: "",
      departmentId: "" || resultPatch.departmentId,
      departName: "",
      overTime: "",
      salaryScale: "",
    };

    if (name) {
      changeStaff.name = name;
    }

    if (doB) {
      changeStaff.doB = doB;
    }

    if (startDate) {
      changeStaff.startDate = startDate;
    }

    if (departmentValue) {
      const d = departList.find((depart) => {
        return depart.name === departmentValue;
      });
      changeStaff.departmentId = d.id;
      changeStaff.departName = d.name;
    }

    if (overTime) {
      changeStaff.overTime = overTime;
    }

    if (salaryScale) {
      changeStaff.salaryScale = salaryScale;
    }
    try {
      const response = await axios.patch(
        "https://nodejstesthatn.herokuapp.com/staffs",
        changeStaff
      );
      if (!!departList) {
        response.data.map((staff) => {
          const departOfStaff = departList.find((depart) => {
            return depart.id === staff.departmentId;
          });
          if (!!departOfStaff) {
            staff.departName = departOfStaff.name;
          }
        });
      }
      const action = setLoadingStaff(response.data);
      dispatch(action);
    } catch {
      alert("Có lỗi xảy ra");
    }
  };

  const handleClear = () => {
    setSearchValue("");
    setShowResult(false);
  };

  return (
    <div className={cx("main")}>
      <form action="" onSubmit={handleSubmit}>
        <div className={cx('container')}>
          <h3 className={cx("form-head")}>Chỉnh sửa thông tin</h3>

          <Tippy
            interactive
            visible={showResult && searchResult.length > 0}
            placement='bottom'
            render={(attrs) => (
              <div  className={cx("btn")}>
                <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                  <div onBlur={handleClear}>
                    <h4 className={cx("search-title")}>Nhân viên</h4>
                    {searchResult.map((result) => {
                      // Get ID function
                      const handleGetId = () => {
                        setResultPatch(result);
                      };
  
                      return (
                        <PatchItem
                          key={result.id}
                          data={result}
                          onClick={handleGetId}
                          
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            onClickOutside={handleHideResult}
          >
            <div className={cx("search")}>
              <input
                value={searchValue}
                placeholder="Tìm kiếm nhân viên"
                spellCheck={false}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowResult(true)}
              />
  
              {!!searchValue && (
                <button className={cx("clear")} onClick={handleClear}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              )}
  
              <button className={cx("search-btn")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </Tippy>
        </div>

        {/* Form */}

        <div className={cx("form-group")}>
          <label htmlFor="fullname" className={cx("form-label")}>
            Tên đầy đủ
          </label>

          <input
            id={cx("fulname")}
            name="name"
            type="text"
            placeholder={resultPatch.name}
            className={cx("input-staff")}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="doB" className={cx("form-label")}>
            Ngày sinh:
          </label>
          <input
            id={cx("doB")}
            name="doB"
            type="text"
            placeholder={dateFormat(resultPatch.doB, "dd/mm/yyyy")}
            className={cx("input-staff")}
            onChange={(e) => setDoB(e.target.value)}
          />
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="startDate" className={cx("form-label")}>
            Ngày vào công ty:
          </label>
          <input
            id={cx("startDate")}
            name="startDate"
            type="text"
            placeholder={dateFormat(resultPatch.startDate, "dd/mm/yyyy")}
            className={cx("input-staff")}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="departmentId" className={cx("form-label")}>
            Phòng ban:
          </label>
          <input
            id={cx("departmentId")}
            name="departmentId"
            type="text"
            placeholder={resultPatch.departName}
            className={cx("input-staff")}
            onChange={(e) => setDepartmentValue(e.target.value)}
          />
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="overTime" className={cx("form-label")}>
            Số ngày làm thêm:
          </label>
          <input
            id={cx("overTime")}
            name="overTime"
            min="0"
            step="any"
            type="number"
            placeholder={resultPatch.overTime}
            className={cx("input-staff")}
            onChange={(e) => setOverTime(e.target.value)}
          />
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="salaryScale" className={cx("form-label")}>
            Hệ số lương:
          </label>
          <input
            id={cx("salaryScale")}
            name="salaryScale"
            type="number"
            min="0"
            step="any"
            placeholder={resultPatch.salaryScale}
            className={cx("input-staff")}
            onChange={(e) => setSalaryScale(e.target.value)}
          />
        </div>

        <button type="submit" className={cx("submit-btn")}>
          <span className={cx("submit-span")}>Submit</span>
        </button>

        <Link to="/" className={cx("submit-btn")}>
          <span className={cx("submit-span")}>Trở về trang nhân viên</span>
        </Link>
      </form>
    </div>
  );
}

export default Patch;
