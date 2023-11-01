import { Badge, Table } from "flowbite-react";
import { useEffect, useState } from "react";

import { CollectionPaginated, JWT, Todo } from "../contracts/MrTodoService";
import MrTodoService from "../services/MrTodoService";

function TodoList({ jwt }: { jwt: JWT | null }) {
  const [todos, setTodos] = useState<CollectionPaginated<Todo> | object>({});

  useEffect(() => {
    if (jwt) {
      MrTodoService.getTodos(jwt).then((res) => {
        "data" in res ? setTodos(res) : console.log(res);
      });
    }
  }, [jwt]);

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
              <Table.Cell>Edit</Table.Cell>
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
