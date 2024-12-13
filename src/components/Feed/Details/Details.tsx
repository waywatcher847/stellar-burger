import styles from './Details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import {Ingredients } from './Ingredients';
import { UniqueItem as TIngredient, TOrder  } from '../../../utils/Types';
import { useStatusOrder } from '../../../hooks/useStatusOrder';

type TOrderFeedDetailsProps = {
  order: TOrder;
  items: TIngredient[];
  price: number;
};

export const OrderFeedDetails = ({ order, items, price }: TOrderFeedDetailsProps) => {
  const status = useStatusOrder(order);

  return (
    <>
      <div className={`mb-15 ${styles.container}`}>
        <h3 className="mb-2 text text_type_main-medium">{order.name}</h3>
        <span
          className={`text text_type_main-default ${styles.status} ${
            status === 'Выполнен' && styles.statusaccent
          }`}
        >
          {JSON.stringify(status)}
        </span>
      </div>
      <div className="mb-10">
        <h3 className="text text_type_main-medium mb-6">Состав:</h3>
        <Ingredients items={items} />
      </div>
      <div className={`mb-10 ${styles.totalprice}`}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text_type_main-default text_color_inactive"
        />
        <div className={styles.price}>
          <span className="text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};

