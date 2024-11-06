import { atom, selector } from "recoil";

export interface IToDos {
  text: string;
  id: number;
  category: string;
}

const loadToDos = () => {
  const savedToDos = localStorage.getItem("toDos");
  return savedToDos ? JSON.parse(savedToDos) : [];
};

const loadCat = (): string[] => {
  const saveCat = localStorage.getItem("categories");
  return saveCat ? JSON.parse(saveCat) : ["TO_DO"];  // 기본 카테고리
};

const loadSelCat = (): string => {
  const saveSelCat = localStorage.getItem("selectedCategory");
  return saveSelCat ? JSON.parse(saveSelCat) : "TO_DO";  // 기본 선택 카테고리
};

export const ToDoState = atom<IToDos[]>({
  key: "toDo",
  default: loadToDos(),  
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newToDos) => {
        localStorage.setItem("toDos", JSON.stringify(newToDos));
      });
    },
  ],
});


export const categoryState = atom<string[]>({
  key: "category",
  default: loadCat(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newCategories) => {
        localStorage.setItem("categories", JSON.stringify(newCategories));
      });
    },
  ],
});

export const selectedCategoryState = atom<string>({
  key: "selCat",
  default: loadSelCat(), 
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newSelCat) => {
        localStorage.setItem("selCat", JSON.stringify(newSelCat));
      });
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(ToDoState);
    const cat = get(selectedCategoryState);
    return toDos.filter((toDo) => toDo.category === cat);
  },
});
