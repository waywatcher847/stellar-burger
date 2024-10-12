import styles from "./BurgerConstructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { UniqueItem } from "../../utils/Types";
import { StackItemProps } from "../../utils/Types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT, REMOVE_INGREDIENT, SET_TOTALPRICE } from '../../services/actions/burgerConstructor'
import { useDispatch } from 'react-redux';
import { FC, SyntheticEvent, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

export const StackItem = (props: StackItemProps) => {
    const { ingredient, idx } = props;
    const dispatch = useDispatch();
    const ingredientRef = useRef<HTMLDivElement>(null);

	const [{ isDragging }, drag] = useDrag({
		type: "inbetween",
		item: () => ({ idx }),

		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

    const [{ handlerId }, drop] = useDrop({
		accept: "inbetween",
		collect(monitor: DropTargetMonitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		drop(item: any, monitor: DropTargetMonitor) {
			if (!ingredientRef.current) {
				return;
			}
			const dragIndex = item.idx;
			const hoverIndex = idx;
			if (hoverIndex === null ) return;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ingredientRef?.current?.getBoundingClientRect();
			if (!hoverBoundingRect) return;
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) * 2 / 3;
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return;
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
            dispatch({ type: MOVE_INGREDIENT, move: { from: dragIndex, to: hoverIndex } });

			item.index = hoverIndex;
		},
	});

    drag(drop(ingredientRef));

    const removeIngridient = (ingredient:UniqueItem) => {
        dispatch({ type: REMOVE_INGREDIENT, ingredient })
        dispatch({ type: SET_TOTALPRICE, ingredient })
    }
    return (
        <div ref={ingredientRef} data-handler-id={handlerId} className={styles.burgerLine}>
        <div className={styles.dragIcon} >
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          handleClose={() => removeIngridient(ingredient)}
          isLocked={false}
          text={ingredient.item.name}
          price={ingredient.item.price}
          thumbnail={ingredient.item.image}
        />
      </div>
        )
}