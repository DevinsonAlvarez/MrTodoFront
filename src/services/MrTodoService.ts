import { EndPoint } from "../contracts/MrTodoService";
import mrTodoEndPoints from "./endPoints";

/** This class represents the Mr. Todo backend. */
export default class MrTodoService {
  private static endpoints: EndPoint[] = mrTodoEndPoints as EndPoint[];

  /**
   * Register new user.
   *
   * @param identifier username/email
   * @param password user password
   */
  public static async singIn(identifier: string, password: string) {
    const login = this.getEndpoint("login")!;

    return await fetch(login.url, {
      method: login.method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });
  }

  /**
   * Returns the JWT user.
   */
  public static signUp() {}

  private static getEndpoint(name: string) {
    return this.endpoints.find((endPoint) => endPoint.name === name);
  }
}
