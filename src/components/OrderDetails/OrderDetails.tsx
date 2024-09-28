import styles from "./OrderDetails.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { orderDetailsProps } from "../../Utils/Types";

export const OrderDetails = (props: orderDetailsProps) => {
  const { orderID } = props;

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_digits-large pb-15">{orderID}</h1>
      <p className="text text_type_main-medium pb-4">идентификатор заказа</p>
      <div className={styles.iconBox}>
        <CheckMarkIcon className={styles.icon} type="primary" />
      </div>
      <p className="text pt-15 pb-4">Ваш заказ начали готовить</p>
      <p className="text text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
