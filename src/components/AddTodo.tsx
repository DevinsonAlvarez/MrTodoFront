import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import {
  CollectionPaginated,
  JWT,
  Todo,
  User,
} from "../contracts/MrTodoService";
import MrTodoService from "../services/MrTodoService";

interface Props {
  jwt: JWT | null;
  user: User | null;
  todos: CollectionPaginated<Todo> | object;
  setTodos: Dispatch<SetStateAction<object | CollectionPaginated<Todo>>>;
}

function AddTodo({ jwt, user, todos, setTodos }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (jwt && user) {
      const res = await MrTodoService.addTodo(jwt, {
        data: { name, description, user: user.id },
      });

      if ("attributes" in res) {
        const newTodos = { ...todos };
        console.log(newTodos);

        newTodos.data!.push(res);

        setTodos(newTodos);
      } else {
        console.log(res);
      }

      setName("");
      setDescription("");
    }
  };

  return (
    <Card className="sticky left-0 top-24 shadow-none">
      <h5 className="text-2xl font-bold">Create to do task</h5>
      <p>Add a new task on your todo's list</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="todoName" value="Task Name" />
          <TextInput
            id="todoName"
            placeholder="Insert a name for your task"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <Label htmlFor="todoDescription" value="Task Description" />
          <Textarea
            id="todoDescription"
            className="p-2"
            placeholder="Insert a short description for your task"
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="flex justify-center gap-3">
          <Button
            type="submit"
            color="dark"
            onClick={(e) => {
              e.preventDefault();
              setName("");
              setDescription("");
            }}
          >
            Clear
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Card>
  );
}

export default AddTodo;
