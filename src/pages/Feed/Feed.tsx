import React, { useEffect } from "react";
import styles from "./Feed.module.css";
import { Details } from "./Details";
import { OrderList } from "../../components/Feed/Array/OrderList";
import { useDispatch } from "../../services/store";
import { connect, disconnect } from "../../services/Actions/Actions";
import { WS_URL } from "../../utils/Constants";

export const OrderFeedPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(connect(`${WS_URL}/all`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <main className={`pr-5 pl-5 ${styles.main}`}>
      <h1 className={`pt-10 pb-5 text_type_main-large ${styles.headertext}`}>
        Лента заказов
      </h1>
      <div className={styles.content}>
        <section className={`custom-scroll ${styles.ordercontainer}`}>
          <OrderList />
        </section>
        <section className={styles.statscontainer}>
          <Details />
        </section>
      </div>
    </main>
  );
};
