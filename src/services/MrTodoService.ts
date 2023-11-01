import {
  AddTodoRequest,
  CollectionPaginated,
  EndPoint,
  ErrorResponse,
  JWT,
  Todo,
  User,
} from "../contracts/MrTodoService";
import mrTodoEndPoints from "./endPoints";

/** This class represents the Mr. Todo backend. */
export default class MrTodoService {
  private static endpoints: EndPoint[] = mrTodoEndPoints as EndPoint[];

  /**
   * Log in the user and returns their JWT.
   *
   * @param identifier username/email
   * @param password user password
   */
  public static async singIn(
    identifier: string,
    password: string,
  ): Promise<{ jwt: JWT; user: User } | ErrorResponse> {
    const login = this.getEndpoint("login")!;

    const res = await fetch(login.url, {
      method: login.method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) return (await res.json()).error;

    const { jwt, user } = await res.json();

    return { jwt, user };
  }

  /**
   * Register new user.
   */
  public static signUp() {}

  /**
   * Returns the user tasks.
   */
  public static async getTodos(
    jwt: JWT,
  ): Promise<CollectionPaginated<Todo> | ErrorResponse> {
    const endPoint = this.getEndpoint("getUserTodos")!;

    const res = await fetch(endPoint.url, {
      method: endPoint.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    if (!res.ok) return (await res.json()).error;

    return res.json();
  }

  /**
   * Insert new task.
   */
  public static async addTodo(
    jwt: JWT,
    data: AddTodoRequest,
  ): Promise<Todo | ErrorResponse> {
    const endPoint = this.getEndpoint("addTodo")!;

    const res = await fetch(endPoint.url, {
      method: endPoint.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) return (await res.json()).error;

    return (await res.json()).data;
  }

  public static async removeTodo(jwt: JWT, todoId: number) {
    const endPoint = this.getEndpoint("removeTodo", [
      ["id", todoId.toString()],
    ]);

    console.log(endPoint?.url);
  }

  private static getEndpoint(name: string, params?: Array<[string, string]>) {
    const endPoint = this.endpoints.find((endPoint) => endPoint.name === name);

    if (!endPoint) return null;

    if (params) {
      endPoint.url = this.replaceUrlParam(endPoint.url, params);
    }

    return endPoint;
  }

  private static replaceUrlParam(url: string, params: Array<[string, string]>) {
    let a = "";

    // params.forEach((param) => {
    //   a = url.replace(`:${param[0]}`, param[1]);
    // });

    // console.log(params[0][1]);
    // console.log(url);

    a = url.replace(`:${params[0][0]}`, params[0][1]);

    return a;
  }
}
