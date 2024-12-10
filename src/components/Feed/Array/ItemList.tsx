import styles from "./Array.module.css";
import { UniqueItem as TIngredient } from "../../../utils/Types";

type TImageListProps = {
  order: string;
  items: (TIngredient | undefined)[];
};

export const ItemList = ({ order, items }: TImageListProps) => {
  const length = items.length - 5;
  return (
    <ul className={styles.images}>
      {items.length <= 5
        ? items.map((item, i) => (
            <li className={styles.imagecontainer} key={`${item?.uniqid}`}>
              <img
                src={item?.item.image_mobile}
                alt={item?.item.name}
                className={styles.cardimage}
              />
            </li>
          ))
        : items.slice(-6).map((item, i) => (
            <li
              className={`${styles.imagecontainer} ${styles.cardcount}`}
              key={`${item?.uniqid}`}
            >
              <img
                src={item?.item.image_mobile}
                alt={item?.item.name}
                className={styles.cardimage}
              />
              <p className={styles.count}>+{length}</p>
            </li>
          ))}
    </ul>
  );
};
