import React, { useEffect } from "react";
import styles from "./Array.module.css";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "../../../services/store";
import { useMatch } from "react-router-dom";
import { ordersSelector } from "../../../services/slices/FeedSlice";
import { hConnect, hDisconnect } from "../../../services/Actions/Actions";
import { selectIngredients } from "../../../services/slices/IngredientsSlice";
import { historyOrdersSelector } from "../../../services/slices/HistorySlice";
import { WS_URL } from "../../../utils/Constants";
import { transformIngredients } from "../../../utils/getIngredientList";
import { getCookie } from "../../../utils/cookie";

export const OrderList = () => {
  const dispatch = useDispatch();

  const match = useMatch("/profile/orders");

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (match) {
      dispatch(hConnect(`${WS_URL}?token=${accessToken?.split("Bearer ")[1]}`));
    }

    return () => {
      if (match) {
        dispatch(hDisconnect());
      }
    };
  }, [dispatch, match]);

  const orders = useSelector(match ? historyOrdersSelector : ordersSelector);

  const Ingredients = transformIngredients(useSelector(selectIngredients));

  return (
    <ul className={styles.list}>
      {orders.map((order) => (
        <li key={order._id}>
          <OrderCard order={order} ingredients={Ingredients} />
        </li>
      ))}
    </ul>
  );
};
