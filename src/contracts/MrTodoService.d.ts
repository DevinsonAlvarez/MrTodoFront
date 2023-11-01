export type EndPoint = {
  name: string;
  url: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

export type AuthProvider = "local";

export type JWT = string;

export interface User {
  id: number;
  username: string;
  email: string;
  blocked: false;
  confirmed: true;
  provider: AuthProvider;
  createdAt: string;
  updatedAt: string;
}
