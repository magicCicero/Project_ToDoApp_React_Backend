import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UpdateToDoListContext } from "../context/Context";
import "./ShowToDos.css";
const ShowToDos = () => {
  const { listlength, setListLength } = useContext(UpdateToDoListContext);
  const [todos, setTodos] = useState([]);

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
      <h1>Showing Todos</h1>
      <section className="to-do-grid">
        {todos.map((todo) => (
          <div key={todo.id} className="to-do-item">
            <h3>{todo.title}</h3>
            <p>{todo.body}</p>
            <h6>{todo.id}</h6>
          </div>
        ))}
      </section>
    </>
  );
};

export default ShowToDos;
