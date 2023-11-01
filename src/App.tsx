import { Flowbite } from "flowbite-react";
import { useState } from "react";

import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("user") !== null);

  return (
    <Flowbite>
      {isAuth ? (
        <>
          <Navbar />
          <div className="mx-auto mt-5 grid h-full min-h-[calc(100vh-84px)] max-w-6xl grid-cols-8 gap-4">
            <section className="relative col-span-3">
              <AddTodo />
            </section>
            <main className="col-span-5">
              <TodoList />
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
        <Login setIsAuth={setIsAuth} />
      )}
    </Flowbite>
  );
}

export default App;
