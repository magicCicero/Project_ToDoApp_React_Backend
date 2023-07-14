import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { UpdateToDoListContext } from "../context/Context";

const UpdateToDo = () => {
  const [todos, setTodos] = useState([]);
  const [oldId, setOldId] = useState("");
  const [newUpdatedTitle, setNewUpdatedTitle] = useState("");
  const [newUpdatedBody, setNewUpdatedBody] = useState("");
  const { listlength, setListLength } = useContext(UpdateToDoListContext);

  const postNewToDo = () => {
    const newToDo = {
      id: oldId,
      title: newUpdatedTitle,
      body: newUpdatedBody,
    };

    fetch(`/todos/${oldId}`, {
      method: "PUT",
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
      <h1>Update ToDo</h1>
      <button onClick={postNewToDo}>Update ToDo</button>
      <input
        type="text"
        value={oldId}
        onChange={(e) => setOldId(e.target.value)}
        placeholder="ID"
      />
      <input
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
      />
    </>
  );
};

export default UpdateToDo;
