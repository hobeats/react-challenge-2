import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import {ToDoState, categoryState, selectedCategoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import userEvent from "@testing-library/user-event";
import AddCat from "./AddCat";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoryState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  function onInput(event: React.FormEvent<HTMLSelectElement>) {
    setSelectedCategory(event.currentTarget.value as any);
  }
  return (
    <div>
      <h1>TO DOs</h1>
      <AddCat/>
      <hr />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "0px 5px",
        }}
      >
        <select value={selectedCategory} onChange={onInput}>
        {categories?.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
        <CreateToDo />
      </div>
      {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
    </div>
  );
}

export default ToDoList;
