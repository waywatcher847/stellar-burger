import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Array.module.css";
import { Link, useLocation, useMatch } from "react-router-dom";
import { UniqueItem as TIngredient, TOrder } from "../../../utils/Types";
import { useStatusOrder } from "../../../hooks/useStatusOrder";
import { ItemList } from "./ItemList";
import uniqid from "uniqid";

type TOrderCardProps = {
  order: TOrder;
  ingredients: TIngredient[];
};

const OrderCard = ({ order, ingredients }: TOrderCardProps) => {
  const location = useLocation();

  const match = useMatch("/feed");

  const nonUniqueitems = order.ingredients.reduce((acc, order) => {
    const item = ingredients.find(
      (ingredient) => ingredient.item._id === order
    );

    if (!item) return acc;

    acc.push(item);

    return acc;
  }, [] as TIngredient[]);

  const items = nonUniqueitems.map((ingredient, index ) => ({
    uniqid: `${index}`,
    item: ingredient.item,
  })
  )

  const status = useStatusOrder(order);

  const price = items.reduce((acc, item) => (acc += item.item.price), 0);

  return (
    <Link
      to={`${match ? `/feed/${order.number}` : `/profile/orders/${order.number}`}`}
      className={`p-6 ${styles.card}`}
      state={{ background_order: location, order, items, price }}
    >
      <div className={styles.orderid}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text text_type_main-small text_color_inactive"
        />
      </div>
      <div>
        <p className="text text_type_main-medium">{order.name}</p>
        <p
          className={`text text_type_main-default ${styles.status} ${
            status === "Выполнен" && styles.statusaccent
          }`}
        >
          {!match && status}
        </p>
      </div>
      <div className={styles.ingredients}>
        <ItemList order={order._id} items={items} />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
export default OrderCard;
