import React, { useState } from "react";
import { AddItemButton } from "./styles";
import NewItemForm from "./NewItemForm";

type AddNewItemType = {
  onAdd: (text: string) => void;
  toggleButtonText: string;
  dark?: boolean;
};

const AddNewItem = ({ onAdd, toggleButtonText, dark }: AddNewItemType) => {
  const [showForm, setShowForm] = useState(false);
  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }
  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};

export default AddNewItem;
