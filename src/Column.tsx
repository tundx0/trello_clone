import AddNewItem from "./AddNewItem";
import Card from "./Card";
import { useAppState } from "./state/AppStateContext";
import { addTask } from "./state/actions";
import { ColumnContainer, ColumnTitle } from "./styles";

type ColumnProp = {
  text: string;
  id: string;
};

const Column = ({ text, id }: ColumnProp) => {
  const { getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(id);
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add Another Card"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};

export default Column;
