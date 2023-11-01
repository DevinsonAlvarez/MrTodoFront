import {
  Button,
  Card,
  DarkThemeToggle,
  Label,
  TextInput,
} from "flowbite-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { User } from "../contracts/MrTodoService";
import MrTodoService from "../services/MrTodoService";

interface Props {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

function Login({ setIsAuth }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    message: string;
    name: string;
    status: number | null;
  }>({
    message: "",
    name: "",
    status: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await MrTodoService.singIn(email, password);

    if (res.ok) {
      const { jwt, user }: { jwt: string; user: User } = await res.json();

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwt", jwt);

      setIsAuth(true);
    } else {
      const { error } = await res.json();

      setIsAuth(false);
      setError({
        message: error.message,
        name: error.name,
        status: error.status,
      });

      console.log(error);
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
            <span className="font-medium text-red-500">{error.message}</span>
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Login;
