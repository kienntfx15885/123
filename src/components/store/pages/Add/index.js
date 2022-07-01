import classNames from "classnames/bind";
import styles from "./Add.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRef } from "react";
import { setLoadingStaff } from "../../actions/StaffAction";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Add() {
  const staffList = useSelector((state) => state.staff.list);
  const departList = useSelector((state) => state.depart.list);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const doBRef = useRef();
  const startDateRef = useRef();
  const departmentIdRef = useRef();
  const overTimeRef = useRef();
  const salaryScaleRef = useRef();

  const formik = useFormik({
    initialValues: {
      id: staffList.length,
      name: "",
      doB: "",
      startDate: "",
      departmentId: "",
      overTime: "",
      salaryScale: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Không được để trống trường này")
        .min(4, "Vui lòng nhập đầy đủ họ tên"),
      doB: Yup.string()
        .required("Không được để trống trường này")
        .matches(
          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
          "not match"
        ),
      startDate: Yup.string()
        .required("Không được để trống trường này")
        .matches(
          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
          "not match"
        ),
      departmentId: Yup.string()
        .required("Không được để trống trường này")
        .min(2, "Phai nhap day du cho nay"),
      overTime: Yup.string()
        .required("Không được để trống trường này")
        .min(1, "Phai nhap day du truong nay"),
      salaryScale: Yup.string()
        .required("Không được để trống trường này")
        .min(1, "Phai nhap day du truong nay"),
    }),
    onSubmit: (values) => {
      const fetchPostStaff = async () => {
        try {
          // Sửa departName
          const d = departList.find((depart) => {
            return depart.name === values.departmentId;
          });
          values.departmentId = d.id;
          values.salary =
            values.salaryScale * 3000000 + values.overTime * 200000;

          // Post API
          const response = await axios.post(
            "https://nodejstesthatn.herokuapp.com/",
            values
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

          // dispatch dữ liệu
          const action = setLoadingStaff(response.data);
          dispatch(action);
        } catch {
          alert("Lỗi");
        }
      };

      fetchPostStaff();

      nameRef.current.value = "";
      doBRef.current.value = "";
      startDateRef.current.value = "";
      departmentIdRef.current.value = "";
      overTimeRef.current.value = "";
      salaryScaleRef.current.value = "";
      nameRef.current.focus();
    },
  });

  return (
    <div className={cx("main")}>
      <form action="" onSubmit={formik.handleSubmit}>
        <h3 className={cx("form-head")}>Thêm thành viên</h3>

        <div className={cx("spacer")}></div>

        <div className={cx("form-group")}>
          <label htmlFor="fullname" className={cx("form-label")}>
            Tên đầy đủ
          </label>

          <input
            id={cx("fulname")}
            name="name"
            type="text"
            placeholder="VD: Nguyễn Văn A"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={cx("input-staff")}
            ref={nameRef}
          />
          {formik.errors.name && (
            <span className={cx("form-message")}>{formik.errors.name}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="doB" className={cx("form-label")}>
            Ngày sinh:
          </label>
          <input
            id={cx("doB")}
            name="doB"
            type="text"
            placeholder="VD: 1999-01-01"
            value={formik.values.doB}
            onChange={formik.handleChange}
            className={cx("input-staff")}
            ref={doBRef}
          />
          {formik.errors.doB && (
            <span className={cx("form-message")}>{formik.errors.doB}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="startDate" className={cx("form-label")}>
            Ngày vào công ty:
          </label>
          <input
            id={cx("startDate")}
            name="startDate"
            type="text"
            placeholder="VD: 2021-01-01"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            className={cx("input-staff")}
            ref={startDateRef}
          />
          {formik.errors.startDate && (
            <span className={cx("form-message")}>
              {formik.errors.startDate}
            </span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="departmentId" className={cx("form-label")}>
            Phòng ban:
          </label>
          <input
            id={cx("departmentId")}
            name="departmentId"
            type="text"
            placeholder="VD: Sale"
            value={formik.values.departmentId}
            onChange={formik.handleChange}
            className={cx("input-staff")}
            ref={departmentIdRef}
          />
          {formik.errors.departmentId && (
            <span className={cx("form-message")}>
              {formik.errors.departmentId}
            </span>
          )}
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
            placeholder="VD: 1"
            value={formik.values.overTime}
            onChange={formik.handleChange}
            className={cx("input-staff")}
            ref={overTimeRef}
          />
          {formik.errors.overTime && (
            <span className={cx("form-message")}>{formik.errors.overTime}</span>
          )}
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
            placeholder="VD: 1"
            value={formik.values.salaryScale}
            onChange={formik.handleChange}
            className={cx("input-staff")}
            ref={salaryScaleRef}
          />
          {formik.errors.salaryScale && (
            <span className={cx("form-message")}>
              {formik.errors.salaryScale}
            </span>
          )}
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

export default Add;
