export type EndPoint = {
  name: string;
  url: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};
