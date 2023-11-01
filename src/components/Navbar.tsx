import {
  DarkThemeToggle,
  Dropdown,
  Navbar as Navigation,
} from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

import { User } from "../contracts/MrTodoService";

interface Props {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const ProfileButton = (
  <div className="rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 max-md:hidden">
    <svg
      className="h-6 w-6 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
    </svg>
  </div>
);

function Navbar({ user, setUser }: Props) {
  return (
    <Navigation fluid className="fixed left-0 top-0 z-50 w-full">
      <Navigation.Brand href="#">
        <h3 className="self-center whitespace-nowrap text-xl font-semibold">
          Mr. Todo
        </h3>
      </Navigation.Brand>
      <DarkThemeToggle className="md:hidden" />
      <Navigation.Toggle />
      <Navigation.Collapse>
        {/* <Navigation.Link href="#">Home</Navigation.Link>
        <Navigation.Link href="#">About</Navigation.Link>
        <Navigation.Link href="#">Services</Navigation.Link>
        <Navigation.Link href="#">Pricing</Navigation.Link>
        <Navigation.Link href="#">Contact</Navigation.Link> */}
      </Navigation.Collapse>
      <div className="flex gap-2">
        <Dropdown arrowIcon={false} inline label={ProfileButton}>
          <Dropdown.Header>
            <span className="block text-sm">{user.username}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => setUser(null)}>Log out</Dropdown.Item>
        </Dropdown>
        <DarkThemeToggle className="max-md:hidden" />
      </div>
    </Navigation>
  );
}

export default Navbar;
