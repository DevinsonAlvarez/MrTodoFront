import { Flowbite } from "flowbite-react";
import { useEffect, useState } from "react";

import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import { JWT, User } from "./contracts/MrTodoService";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<JWT | null>(localStorage.getItem("jwt"));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    storedUser ? setUser(JSON.parse(storedUser)) : setUser(null);
  }, []);

  return (
    <Flowbite>
      {user !== null ? (
        <>
          <Navbar user={user} setUser={setUser} setJwt={setJwt} />
          <div className="mx-auto mt-5 grid h-full min-h-[calc(100vh-84px)] max-w-6xl grid-cols-8 gap-4">
            <section className="relative col-span-3">
              <AddTodo />
            </section>
            <main className="col-span-5">
              <TodoList jwt={jwt} />
            </main>
          </div>
          <footer className="w-full">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
            impedit, aperiam consequuntur optio pariatur eum dolor tempore,
            ipsa, placeat sequi suscipit porro molestias! Fugiat facere vitae
            ipsum, quos sit beatae?
          </footer>
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </Flowbite>
  );
}

export default App;
