import { useState, useEffect } from "react";
import ShowToDos from "./components/showToDos";
import AddToDo from "./components/addToDo";
import UpdateToDo from "./components/UpdateToDo";
import DeleteToDo from "./components/DeleteToDo";
import axios from "axios";
import "./App.css";
import { UpdateToDoListContext } from "./context/Context";

function App() {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [listlength, setListLength] = useState(0);

  useEffect(() => {
    axios
      .get("/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <UpdateToDoListContext.Provider value={{ listlength, setListLength }}>
        <h1>ToDos App</h1>
        <AddToDo />
        <ShowToDos />
        <UpdateToDo />
        <DeleteToDo />
      </UpdateToDoListContext.Provider>
    </>
  );
}

export default App;
