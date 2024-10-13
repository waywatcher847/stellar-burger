import styles from "./OrderDetails.module.css";
import { OrderDetailsProps, OrderDetailsType } from "../../utils/Types";
import doneImage from "../../image/done.svg";
import waitImage from "../../image/spinning-dots.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../utils/Types";

export const OrderDetails = () => {
 const { loading, name, order } = useSelector((store: RootReducerType) => store.orderDetails);
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_digits-large pb-15">
        {order.number}
      </h1>
      <p className="text text_type_main-medium pb-4">{name}</p>
      <img src={!loading?doneImage:waitImage} alt={"done.svg"} className={styles.icon} />
      <p className="text pt-15 pb-4">{!loading?"Ваш заказ начали готовить":"Ожидание ответа сервера..."}</p>
      <p className="text text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
