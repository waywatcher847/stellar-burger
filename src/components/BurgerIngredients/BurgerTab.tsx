import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerTabProps } from "../../utils/Types";

export const BurgerTab = (props: BurgerTabProps) => {
  const { tabName, currentTab, clickHandler } = props;

  return (
    <Tab
      value={tabName}
      active={currentTab === tabName}
      onClick={(currentTab) => clickHandler(currentTab)}
    >
      {tabName}
    </Tab>
  );
};
