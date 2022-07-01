
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import {Wrapper as PopperWrapper} from '~/components/Popper'


const cx  = classNames.bind(styles)
function Menu({children}) {
  return (
    <div>
      <Tippy
        interactive
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx("content")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <h2>Menu Item</h2>
            </PopperWrapper>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default Menu;
