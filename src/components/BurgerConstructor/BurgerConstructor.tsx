import { SyntheticEvent } from "react";
import { DROP_ORDER } from "../../services/slices/OrderSlice";
import { plugData } from "../../utils/data";
import { fetchNewOrder } from "../../services/slices/OrderSlice";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { ItemCardDND } from "../../utils/Types";
import styles from "./BurgerConstructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "../../services/store";
import { useDrop } from "react-dnd";
import { BurgerStack } from "./BurgerStack";
import { useNavigate } from "react-router-dom";
import {
  REMOVE_INGREDIENT,
  ADD_BUN,
  SET_TOTALPRICE,
  DROP_TOTALPRICE,
  ADD_INGREDIENT,
} from "../../services/slices/ConstructorSlice";
export const BurgerConstructor = () => {
  const { bun, ingredients, totalPrice } = useSelector(
    (store) => store.burgerConstrucor,
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
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
    drop: (payload: ItemCardDND) => {
      if (payload.itemCard === null) {
        return;
      }
      if (payload.itemCard.type === "bun") {
        dispatch(ADD_BUN(payload.itemCard));
      } else {
        dispatch(ADD_INGREDIENT(payload.itemCard));
      }
      dispatch(SET_TOTALPRICE());
    },
  });

  const getOrder = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (isModalOpen) {
      return;
    }
    if (!bun?.name) {
      return;
    }
    const orderIds = [
      bun._id,
      ...ingredients.map((item) => item.item._id),
      bun._id,
    ];
    dispatch(fetchNewOrder(orderIds));
    openModal();
  };

  const onClose = (e: KeyboardEventInit | React.MouseEvent<HTMLDivElement>) => {
    {
      ingredients.forEach((ingredient) =>
        dispatch(REMOVE_INGREDIENT(ingredient)),
      );
      dispatch(DROP_ORDER());
      dispatch(ADD_BUN(plugBunInfo));
      dispatch(DROP_TOTALPRICE());
      closeModal();
    }
  }
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
          onClick={(e) => {
            // e.preventDefault();
            getOrder();
          }}
        >
          Оформить заказ
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onClose={onClose}
            >
              <OrderDetails />
            </Modal>
          )}
        </Button>
      </div>
    </section>
  );
};
