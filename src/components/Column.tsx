import { useRef } from "react";
import AddNewItem from "./AddNewItem";
import Card from "./Card";
import { useAppState } from "../state/AppStateContext";
import { addTask, moveList } from "../state/actions";
import { ColumnContainer, ColumnTitle } from "../styles";
import { isHidden, useItemDrag } from "../utils";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";

type ColumnProp = {
  text: string;
  id: string;
  isPreview?: boolean;
};

const Column = ({ text, id, isPreview }: ColumnProp) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      }
    }),
  });

  drag(drop(ref));

  const tasks = getTasksByListId(id);
  return (
    <ColumnContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
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
