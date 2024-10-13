import styles from "./BurgerConstructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { BurgerStack } from "./BurgerStack";
import {
  REMOVE_INGREDIENT,
  ADD_BUN,
  SET_TOTALPRICE,
  addIngredient,
} from "../../services/actions/burgerConstructor";
import { plugData } from "../../utils/data";
import { getOrderDetails } from "../../services/actions/order";
import { OrderDetails } from "../OrderDetails/OrderDetails";

export const BurgerConstructor = () => {
  const { bun, ingredients, totalPrice } = useSelector(
    (store) => store.burgerConstrucor,
  );
  const { isModalOpen, openModal, closeModal } = useModal();
  const plugBunInfo = plugData[0];
  const bunInfo = !bun ? plugBunInfo : bun;
  const meatStack = ingredients
    .filter(
      (ingredient) =>
        ingredient?.item?.type === "main" || ingredient?.item?.type === "sauce",
    )
    .map((ingredient) => ingredient);

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: ({ itemCard }) => {
      if (itemCard.type === "bun") {
        dispatch({ type: ADD_BUN, itemCard });
      } else {
        dispatch(addIngredient(itemCard));
      }
      dispatch({ type: SET_TOTALPRICE, itemCard });
    },
  });

  const getOrder = () => {
    if (isModalOpen) {
      return;
    }
    if (bun === null) {
      return;
    }
    const orderIds = [
      bun._id,
      ...ingredients.map((item) => item.item._id),
      bun._id,
    ];
    dispatch(getOrderDetails(orderIds));
    openModal();
  };

  return (
    <section className={styles.section}>
      <div className={styles.burgerWrapper} ref={dropTarget}>
        <div className={styles.burgerLine}>
          <div className={styles.dragIcon} />
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bunInfo.name + "\n(верх)"}
            price={bunInfo.price}
            thumbnail={bunInfo.image}
          />
        </div>
        <div className={styles.burgerStack}>
          <BurgerStack itemList={meatStack} />
        </div>
        <div className={styles.burgerLine}>
          <div className={styles.dragIcon} />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bunInfo.name + "\n(низ)"}
            price={bunInfo.price}
            thumbnail={bunInfo.image}
          />
        </div>
      </div>
      <div className={styles.Footer}>
        <div className={styles.Price}>
          <p className="text text_type_digits-medium pr-4">{totalPrice}</p>
          <CurrencyIcon className={styles.Icon} type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => getOrder()}
        >
          Оформить заказ
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onClose={(e) => {
                e.stopPropagation();
                ingredients.forEach((ingredient) =>
                  dispatch({ type: REMOVE_INGREDIENT, ingredient }),
                );
                dispatch({ type: ADD_BUN, plugBunInfo });
                closeModal();
              }}
            >
              <OrderDetails />
            </Modal>
          )}
        </Button>
      </div>
    </section>
  );
};
