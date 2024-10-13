import { BurgerStackProps } from "../../utils/Types";
import { StackItem } from "./StackItem";

export const BurgerStack = (props: BurgerStackProps) => {
  const { itemList } = props;

  return (
    <>
      {itemList.map((ingredient, i) => {
        return (
          <StackItem ingredient={ingredient} idx={i} key={ingredient.uniqid} />
        );
      })}
    </>
  );
};
