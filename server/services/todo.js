import fs from "fs";
import { v4 as uuid } from "uuid";

const todoFileUrl = new URL("../data/todos.json", import.meta.url);

// POST/WRITE Funktion.
export const writeToDo = async (newToDo) => {
  console.log(newToDo);
  // Alle Todos werden aus der lokalen JSON geladen
  let allToDos = JSON.parse(fs.readFileSync(todoFileUrl, "utf8"));
  // Danach wird geprüft ob es sich um ein Array handelt.WEnn nicht, wird ein leeres Array erstellt. Nach dem ersten Eintrag wird die if else nicht mehr gebraucht
  if (!Array.isArray(allToDos)) {
    allToDos = [];
  }
  // // Ansonsten wird dem neuen ToDo eine unique ID hinzugefügt.
  // newToDo.id = uuid();
  // Danach wird es in dem Array gepusht
  allToDos.push(newToDo);
  // Anschließend wird die neue JSON Datei geschrieben und gespeichert
  fs.writeFileSync(todoFileUrl, JSON.stringify(allToDos, null, 2), "utf8");
  return allToDos;
};

// DELETE/DELETE Funktion
export const deleteToDo = async (id) => {
  // Alle Todos werden aus der lokalen JSON geladen
  let allToDos = JSON.parse(fs.readFileSync(todoFileUrl, "utf8"));
  // Danach wird das zulöschende ToDo anhander übermittelten ID gefiltert. Was bleibt ist eine gefilterte Kopie der Json ohne der gesuchten ID. Damit wird gleichzeitig das Array gekürzt
  let deletingToDo = allToDos.filter((todo) => todo.id !== id); // der !== Operator löscht den Eintrag aus dem Array

  // Nun wird geprüft ob sich die Array Länge geändert hat. Das ist wichtig, damit der User später in der server.js eine korrekte Response erhält. Ist die Array Länge gleich wurde ein ToDo mit der entsprechenden ID gefunden. Das neue Array wird zu Null und gleichzeitig wird KEINE neue JSON Datei geschrieben.
  if (deletingToDo.length === allToDos.length) {
    deletingToDo = null; // Kein ToDo mit der entsprechenden ID gefunden
  } else {
    // Ist die Array Länge nicht gleich, wird die lokale JSON überschrieben, da vorher ja die POST ID gesucht und mit der filter funktion gelöscht wurde.
    fs.writeFileSync(
      todoFileUrl,
      JSON.stringify(deletingToDo, null, 2),
      "utf8"
    );
  }
  return deletingToDo;
};

// PUT/UPDATE Funktion
export const updateToDo = async (id, body) => {
  // Alle Todos werden aus der lokalen JSON geladen

  let allToDos = JSON.parse(fs.readFileSync(todoFileUrl, "utf8"));
  // Es wird eine Variable mit dem Request-Body gespeichert, damit dieser am Ende der Funktion returned wird und als Response an den User übermittelt wird
  let selectedToDo = body;
  // Die übermittelte ID wird ebenfalls in der Variable gespeichert
  selectedToDo.id = id;
  // Nun wird in der lokalen JSON Datei gemapped und nach der gesuchten ID gefiltert. Erhalten wir ein Treffer, so wird das gefundene ToDo mit dem Req Body ersetzt und die alte ID beibehalten
  allToDos = allToDos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, ...body, id: todo.id }; // Aktualisiere das ToDo-Element mit der entsprechenden ID und behalte die alte ID bei
    }
    return todo;
  });
  // Nun wird die neue JSON Datei geschrieben und gespeichert
  fs.writeFileSync(todoFileUrl, JSON.stringify(allToDos, null, 2), "utf8");
  return selectedToDo;
};

// GET/READ Funktion
export const readToDos = async () => {
  // Alle Todos werden aus der lokalen JSON geladen und returned
  let allToDos = JSON.parse(fs.readFileSync(todoFileUrl, "utf8"));
  return allToDos;
};

// GET/READ ONE Funktion
export const getOneToDo = async (id) => {
  // Alle Todos werden aus der lokalen JSON geladen
  let allToDos = JSON.parse(fs.readFileSync(todoFileUrl, "utf8"));
  // Danach wird anhand der gesuchten ID innerhalb der JSON Datei gesucht und das gefundene TODO returned
  let oneToDo = allToDos.find((todo) => todo.id === id);
  return oneToDo;
};
