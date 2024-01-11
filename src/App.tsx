import AddNewItem from "./components/AddNewItem";
import Column from "./components/Column";
import { CustomDragLayer } from "./components/CustomDragLayer";
import { useAppState } from "./state/AppStateContext";
import { addList } from "./state/actions";
import { AppContainer } from "./styles";

const App = () => {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add Another List"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};

export default App;
