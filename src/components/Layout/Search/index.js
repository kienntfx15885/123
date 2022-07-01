import Tippy from "@tippyjs/react/headless";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import UserItem from "~/components/UserItem";

import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { findDepartStaff } from "~/components/store/actions/StaffAction";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const inputRef = useRef();

  const staffList = useSelector((state) => state.staff.list);
  const departList = useSelector((state) => state.depart.list);

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

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
    setShowResult(false);
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <div>
      <Tippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div onClick={handleClear} className={cx("btn")}>
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx("search-title")}>Nhân viên</h4>
                {searchResult.map((result) => (
                  <UserItem
                    key={result.id}
                    data={result}
                    onClick={handleClear}
                  />
                ))}
              </PopperWrapper>
            </div>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
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

          {/* <FontAwesomeIcon className={cx("loading")} icon={faSpinner} /> */}

          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
