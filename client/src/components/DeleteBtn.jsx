import { useEffect, useContext, useState } from "react";
import { UpdateToDoListContext } from "../context/Context";
import axios from "axios";

const DeleteBtn = (props) => {
  const { listlength, setListLength } = useContext(UpdateToDoListContext);
  const [todos, setTodos] = useState([]);

  const speedDelete = () => {
    console.log(props.id);
    fetch(`/todos/${props.id}`, {
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
      <button onClick={speedDelete}>Delete ToDo</button>
    </>
  );
};

export default DeleteBtn;
