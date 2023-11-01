const baseUrl = "http://localhost:1337/api";

export default [
  {
    name: "login",
    url: baseUrl + "/auth/local",
    method: "POST",
  },
  {
    name: "register",
    url: baseUrl + "/auth/local/register",
    method: "POST",
  },
  {
    name: "getUserTodos",
    url: baseUrl + "/todos/me",
    method: "GET",
  },
  {
    name: "addTodo",
    url: baseUrl + "/todos",
    method: "POST",
  },
  {
    name: "removeTodo",
    url: baseUrl + "/todos/:id",
    method: "DELETE",
  },
];
