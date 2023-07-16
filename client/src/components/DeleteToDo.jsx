import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UpdateToDoListContext } from "../context/Context";
import "./DeleteToDo.css";
const DeleteToDo = () => {
  const [todos, setTodos] = useState([]);
  const [oldId, setOldId] = useState("");

  const { listlength, setListLength } = useContext(UpdateToDoListContext);

  const startDeleting = () => {
    fetch(`/todos/${oldId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setListLength(listlength + 1);
    console.log(listlength);
  };
  useEffect(() => {
    axios
      .get("/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [listlength]);

  return (
    <>
      <section className="delete-container">
        <button onClick={startDeleting}>Delete ToDo</button>

        <input
          type="text"
          value={oldId}
          onChange={(e) => setOldId(e.target.value)}
          placeholder="ID"
        />
      </section>
      {/* <input
        type="text"
        value={newUpdatedTitle}
        onChange={(e) => setNewUpdatedTitle(e.target.value)}
        placeholder="new Title"
      />
      <input
        type="text"
        value={newUpdatedBody}
        onChange={(e) => setNewUpdatedBody(e.target.value)}
        placeholder="new Body"
      /> */}
    </>
  );
};

export default DeleteToDo;
