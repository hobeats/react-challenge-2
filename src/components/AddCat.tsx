import { useState } from "react";
import { useRecoilState } from "recoil";
import { categoryState, selectedCategoryState } from "../atoms";

function AddCat() {
  const [newCat, setNewCat] = useState("");
  const [categories, setCategories] = useRecoilState(categoryState);

  const addCat = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat("");
    }
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={newCat}
        onChange={(event) => setNewCat(event.target.value)}
        placeholder="새 카테고리"
      />
      <button onClick={addCat}>카테고리 추가</button>  
    </div>
  );
}

export default AddCat;
