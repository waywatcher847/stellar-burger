import React from "react";
import { Panel } from "./Panel";
import {
  totalOrdersSelector,
  totalTodayOrdersSelector,
} from "../../services/slices/FeedSlice";
import { useSelector } from "../../services/store";

export const Details = () => {
  const totalOrders = useSelector(totalOrdersSelector);
  const totalTodayOrders = useSelector(totalTodayOrdersSelector);

  return (
    <>
      <Panel />
      <div>
        <h2 className="text_type_main-medium">Выполнено за все время:</h2>
        <div className="text_type_digits-large">{totalOrders}</div>
      </div>
      <div>
        <h2 className="text_type_main-medium">Выполнено за сегодня:</h2>
        <div className="text_type_digits-large">{totalTodayOrders}</div>
      </div>
    </>
  );
};
