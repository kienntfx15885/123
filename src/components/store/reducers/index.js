import StaffReducer from "./StaffReducer";
import { combineReducers } from "redux";
import DepartReducer from "./DepartReducer";
import SalaryReducer from "./SalaryReducer";

const rootReducer = combineReducers({
  staff: StaffReducer,
  depart: DepartReducer,
  salary: SalaryReducer,
});

export default rootReducer;
