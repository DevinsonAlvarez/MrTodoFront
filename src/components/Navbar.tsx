import {
  DarkThemeToggle,
  Dropdown,
  Navbar as Navigation,
} from "flowbite-react";

const ProfileButton = (
  <button
    type="button"
    className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700  max-md:hidden"
  >
    <svg
      className="h-6 w-6 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
    </svg>
  </button>
);

function Navbar() {
  return (
    <Navigation fluid className="fixed left-0 top-0 w-full">
      <Navigation.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Mr. Todo
        </span>
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
            <span className="block text-sm">Pedro</span>
            <span className="block truncate text-sm font-medium">
              pedro@email.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Log out</Dropdown.Item>
        </Dropdown>
        <DarkThemeToggle className="max-md:hidden" />
      </div>
    </Navigation>
  );
}

export default Navbar;
