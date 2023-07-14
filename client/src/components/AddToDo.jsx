import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { UpdateToDoListContext } from "../context/Context";

const AddToDo = () => {
  const [todos, setTodos] = useState([]);
  const [newToDoTitle, setNewToDoTitle] = useState("");
  const [newToDoBody, setNewToDoBody] = useState("");
  const { listlength, setListLength } = useContext(UpdateToDoListContext);

  const postNewToDo = () => {
    const newToDo = {
      id: uuid(),
      title: newToDoTitle,
      body: newToDoBody,
    };

    fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToDo),
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
      <h1>Add ToDo</h1>
      <button onClick={postNewToDo}>Add ToDo</button>
      <input
        type="text"
        value={newToDoTitle}
        onChange={(e) => setNewToDoTitle(e.target.value)}
        placeholder="title"
      />
      <input
        type="text"
        value={newToDoBody}
        onChange={(e) => setNewToDoBody(e.target.value)}
        placeholder="body"
      />
    </>
  );
};

export default AddToDo;
