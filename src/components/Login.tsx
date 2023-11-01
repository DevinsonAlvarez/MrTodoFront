import {
  Button,
  Card,
  DarkThemeToggle,
  Label,
  TextInput,
} from "flowbite-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { ErrorResponse, User } from "../contracts/MrTodoService";
import MrTodoService from "../services/MrTodoService";

interface Props {
  setUser: Dispatch<SetStateAction<User | null>>;
}

function Login({ setUser }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ErrorResponse | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await MrTodoService.singIn(email, password);

    if ("user" in res) {
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("jwt", res.jwt);

      setUser(res.user);
    } else {
      setUser(null);
      setError({
        message: res.message,
        name: res.name,
        status: res.status,
      });
    }
  };

  return (
    <>
      <DarkThemeToggle className="absolute right-5 top-5" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="whitespace-nowrap text-center text-2xl font-semibold">
          Mr. Todo
        </h1>

        <Card className="mt-4 min-w-[400px]">
          <h3 className="text-center text-xl font-bold">Login</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                placeholder="Insert your email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                placeholder="Insert your account password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            {error && (
              <span className="font-medium text-red-500">{error.message}</span>
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Login;
