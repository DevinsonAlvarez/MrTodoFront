export default [
  {
    name: "login",
    url: "http://localhost:1337/api/auth/local",
    path: "/api/auth/local",
    method: "POST",
  },
  {
    name: "register",
    url: "http://localhost:1337/api/auth/local/register",
    path: "/api/auth/local/register",
    method: "POST",
  },
  {
    name: "getUserTodos",
    url: "http://localhost:1337/api/todos/me",
    path: "/api/todos/me",
    method: "GET",
  },
];
