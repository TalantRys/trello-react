import classNames from "classnames";
import { useEffect, useRef, useState, type FunctionComponent } from "react";
import Button from "../ui/Button/Button";
import styles from "./Menu.module.scss";
import icon from "/ellipsis-solid-full.svg";

export type MenuProps = {
  items: { name: string; onClick: () => void }[] | undefined;
};

const Menu: FunctionComponent<MenuProps> = ({ items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen]);

  if (!items.length) return null;

  return (
    <div ref={ref}>
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
    </div>
  );
};

export default Menu;
