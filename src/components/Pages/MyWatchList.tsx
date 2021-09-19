import React, { useState, FC, useEffect } from "react";
import { uuid } from "uuidv4";

interface IToDo {
  id: string;
  name: string;
  completed: false | true;
  key?: string;
}

export const MyWatchList: FC = () => {
  const [agenda, setAgenda] = useState<IToDo[]>(
    JSON.parse(localStorage.getItem("items") || "[]")
  );
  const [toDo, setToDo] = useState("");

  const addToDo = (toDos: React.MouseEvent<HTMLButtonElement>) => {
    if (toDo === "") {
      return alert("Лінійка не може бути пустою");
    }
    setAgenda((prevState: IToDo[]) => [
      ...prevState,
      { id: uuid(), name: toDo, completed: false },
    ]);
    setToDo("");
  };

  const deleteToDo = (id: string) => {
    setAgenda((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(agenda));
  }, [agenda]);

  return (
    <div>
      <h1>to do list</h1>
      <input
        type="text"
        onChange={(e) => setToDo(e.target.value)}
        value={toDo}
      />
      <button onClick={addToDo}>add task</button>
      <br />
      <ul>
        {agenda &&
          agenda.map((item: IToDo) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => deleteToDo(item.id)}>видалити</button>
            </li>
          ))}
      </ul>
    </div>
  );
};
