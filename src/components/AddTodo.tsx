import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";

function AddTodo() {
  return (
    <Card className="sticky left-0 top-24 shadow-none">
      <h5 className="text-2xl font-bold">Create to do task</h5>
      <p>Add a new task on your todo's list</p>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <Label htmlFor="todoName" value="Task Name" />
          <TextInput
            id="todoName"
            placeholder="Insert a name for your task"
            type="text"
            required
          />
        </div>
        <div>
          <Label htmlFor="todoDescription" value="Task Description" />
          <Textarea
            id="todoDescription"
            className="p-2"
            placeholder="Insert a short description for your task"
            rows={5}
            required
          />
        </div>
        <div className="flex justify-center gap-3">
          <Button type="submit" color="dark">
            Clear
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Card>
  );
}

export default AddTodo;
