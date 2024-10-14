import { IngredientPanelProps } from "../../utils/Types";
import { IngredientCard } from "./IngredientCard";

export const IngredientPanel = (props: IngredientPanelProps) => {
  const { currentTab, data } = props;

  const itemType = (() => {
    switch (currentTab) {
      case "Булки":
        return "bun";
      case "Начинки":
        return "main";
      case "Соусы":
        return "sauce";
      default:
        return "bun";
    }
  })();
  return (
    <>
      {data
        .filter((item) => item.type === itemType)
        .map((item, i) => (
          <IngredientCard idx={i} itemCard={item} key={item._id} />
        ))}
    </>
  );
};
