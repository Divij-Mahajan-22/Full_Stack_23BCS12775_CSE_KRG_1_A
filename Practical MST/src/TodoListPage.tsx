import React from "react";
type Todo = {
  id: string;
  text: string;
  done: boolean;
};

interface TodoListPageProps {
  todos: Todo[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  remaining: number;
}

const TodoListPage: React.FC<TodoListPageProps> = ({
  todos,
  input,
  setInput,
  addTodo,
  toggleTodo,
  removeTodo,
  remaining,
}) => (
  <>
    <div className="min-h-full bg-gray-100 py-10">
      <div className="mx-auto w-full max-w-xl px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Todo List
        </h1>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-50"
            onClick={addTodo}
            disabled={!input.trim()}
          >
            Add
          </button>
        </div>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div>{remaining} left</div>
        </div>
        <ul className="space-y-2">
          {todos.length === 0 && (
            <li className="text-center text-gray-500 py-6">No tasks to show</li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="group flex items-center gap-3 rounded-md bg-white p-3 shadow border border-gray-200"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={
                  "size-5 rounded border flex items-center justify-center " +
                  (todo.done
                    ? "bg-green-500 border-green-600"
                    : "bg-white border-gray-300")
                }
              >
                {todo.done && <span className="text-white">&#10003;</span>}
              </button>
              <span
                className={
                  "flex-1 text-gray-900 " +
                  (todo.done ? "line-through text-gray-400" : "")
                }
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 opacity-0 group-hover:opacity-100"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default TodoListPage;
