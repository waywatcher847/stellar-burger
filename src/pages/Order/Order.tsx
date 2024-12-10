import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { OrderFeedDetails } from "../../components/Feed/Details/Details";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/slices/HistorySlice";
import { fetchIngredients } from "../../services/slices/IngredientsSlice";
import styles from "./Order.module.css";
import { selectIngredients } from "../../services/slices/IngredientsSlice";
import { UniqueItem as TIngredient } from "../../utils/Types";
import { transformIngredients } from "../../utils/getIngredientList";

export function OrderPage() {
  const { number } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    if (number) {
      dispatch(getOrderById(number));
    }
  }, [dispatch, number]);

  const ingredients = transformIngredients(useSelector(selectIngredients));

  const order = useSelector((store) => {
    if (!number) return null;

    if (store.history.orders.length) {
      const data = store.history.orders.find((o) => o.number === +number);
      if (data) return data;
    }
    if (store.feed.orders.length) {
      const data = store.feed.orders.find((o) => o.number === +number);
      if (data) return data;
    }
  });

  if (!order) {
    return null;
  }

  const items = order.ingredients.reduce((acc, order) => {
    const item = ingredients.find(
      (ingredient) => ingredient.item._id === order,
    );

    if (!item) return acc;

    acc.push(item);

    return acc;
  }, [] as TIngredient[]);

  const price = items?.reduce((acc, item) => (acc += item.item.price), 0);

  return (
    <div className={styles.container}>
      <div className={`text_type_digits-default ${styles.number}`}>
        {`#${order.number}`}
      </div>
      <OrderFeedDetails order={order} items={items} price={price} />
    </div>
  );
}
