import { TOrder } from "../utils/Types";

export const useStatusOrder = (order: TOrder) => {
  switch (order.status) {
    case "done":
      return "Выполнен";
    case "pending":
      return "Готовится";
    case "created":
      return "Создан";
  }
};
