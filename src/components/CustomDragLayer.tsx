import { useDragLayer } from "react-dnd";
import { useAppState } from "../state/AppStateContext";
import { CustomDragLayoutPreview, DragPreviewWrapper } from "../styles";
import Column from "./Column";
export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayoutPreview>
      <DragPreviewWrapper position={currentOffset}>
        <Column id={draggedItem.id} text={draggedItem.text} isPreview />
      </DragPreviewWrapper>
    </CustomDragLayoutPreview>
  ) : null;
};
