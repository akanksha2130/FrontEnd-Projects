import React from "react";
import MultiStepForm from "./components/MultiStepForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MultiStepForm />
    </DndProvider>
  );
};

export default App;
