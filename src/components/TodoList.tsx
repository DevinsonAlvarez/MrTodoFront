import { Badge, Table } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect } from "react";

import { CollectionPaginated, JWT, Todo } from "../contracts/MrTodoService";
import MrTodoService from "../services/MrTodoService";

interface Props {
  jwt: JWT | null;
  todos: CollectionPaginated<Todo> | object;
  setTodos: Dispatch<SetStateAction<object | CollectionPaginated<Todo>>>;
}

function TodoList({ jwt, todos, setTodos }: Props) {
  useEffect(() => {
    if (jwt) {
      MrTodoService.getTodos(jwt).then((res) => {
        "data" in res ? setTodos(res) : console.log(res);
      });
    }
  }, [jwt, setTodos]);

  const handleDelete = async (jwt: JWT, todoId: number) => {
    await MrTodoService.removeTodo(jwt, todoId);
  };

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Created At</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {"data" in todos ? (
          todos.data.map((todo) => (
            <Table.Row key={todo.id} className="dark:bg-gray-800">
              <Table.Cell>{todo.attributes.name}</Table.Cell>
              <Table.Cell>{todo.attributes.description}</Table.Cell>
              <Table.Cell>
                {todo.attributes.is_completed ? (
                  <Badge color="success" className="w-fit">
                    Completed
                  </Badge>
                ) : (
                  <Badge color="dark" className="w-fit">
                    Pending
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell>
                {new Date(todo.attributes.createdAt).toLocaleString("es-CO", {
                  dateStyle: "short",
                })}
              </Table.Cell>
              <Table.Cell>
                <button
                  className="text-red-500 hover:underline"
                  type="button"
                  onClick={() => handleDelete(jwt!, todo.id)}
                >
                  delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell>Loading...</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

export default TodoList;
