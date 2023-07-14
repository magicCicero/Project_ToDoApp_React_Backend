import express from "express";
import {
  writeToDo,
  deleteToDo,
  updateToDo,
  readToDos,
  getOneToDo,
} from "./services/todo.js";
import cors from "cors";

const app = express();
const PORT = 9898;

app.use(cors());
app.use(express.json());

// Es wird ein Status Endpunkt erstellt, der als Response 200 sendet
app.get("/status", (req, res) => {
  res.send("Server is up and running");
});

// Es werden alle ToDos geladen und als Response zurückgegeben
app.get("/todos", async (req, res) => {
  const toDos = await readToDos();
  res.send(toDos);
});

// Es werden alle ToDos um die jeweilige ID gesucht und an die Funktion getOneToDo übergeben. Hat die Funktion die gesuchte ID gefunden, wird das gefundene ToDo zurückgegeben. Andernfalls gibt es eine 404 Meldung

app.get("/todos/:id", async (req, res) => {
  const oneTodo = await getOneToDo(req.params.id);
  if (!oneTodo) {
    res
      .status(404)
      .send("Kein ToDo unter der ID " + req.params.id + " gefunden");
  } else {
    res.send(oneTodo);
  }
});

// Es wird an die Funktion WriteToDo das übermittelte Body übergeben. Danach gibt es eine Response Meldung, dass das ToDo erstellt wurde
app.post("/todos", async (req, res) => {
  console.log(req.body);
  const newToDo = await writeToDo(req.body);
  res.send("Todo wurde erstellt: " + JSON.stringify(newToDo, null, 2));
});

// Es wird anhand einer bestimmten ID gesucht und das Toto geändert. Die Funktion updateToDo erhält die ID und das Body, was der User als Änderung in der Request sendet. Als Response wird das gefundene ToDo als geänderte ToDo zurückgegeben.
app.put("/todos/:id", async (req, res) => {
  const updatedToDo = await updateToDo(req.params.id, req.body);
  res.send("Todo wurde aktualisiert: " + JSON.stringify(updatedToDo));
});

// Es wird anhand einer bestimmten ID gesucht und das ToDo gelöscht. Die Funktion deleteToDo erhält die ID. Wird die ID gefunden, gibt es eine Löschmeldung. Ansonsten wird 404 zurückgegeben.
app.delete("/todos/:id", async (req, res) => {
  const deletedToDo = await deleteToDo(req.params.id);
  if (deletedToDo) {
    res.send("Todo wurde gelöscht: " + req.params.id);
  } else {
    res
      .status(404)
      .send(
        "Kein ToDo unter der ID " +
          req.params.id +
          " gefunden. Daher wurde kein ToDo gelöscht"
      );
  }
});

// Server Listener
app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
