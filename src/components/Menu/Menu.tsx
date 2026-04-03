import classNames from "classnames";
import { useState, type FunctionComponent } from "react";
import Button from "../ui/Button/Button";
import styles from "./Menu.module.scss";
import icon from "/ellipsis-solid-full.svg";

export type MenuProps = {
  items: { name: string; onClick: () => void }[] | undefined;
};

const Menu: FunctionComponent<MenuProps> = ({ items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      <button
        className={styles["menu-toggle"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={icon} alt="menu-icon" width={26} height={26} loading="lazy" />
      </button>

      <nav className={styles.menu}>
        <ul
          className={classNames(styles.menu__list, {
            [styles.active]: isOpen,
          })}
        >
          {items.map((item, index) => (
            <li key={index} className={styles.menu__item}>
              <Button
                className={styles.button}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Menu;
