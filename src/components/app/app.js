import Task from "../task/task";

const App = () => {

  const todoData = [];

  return (
    <div className="todo-app">
      <Task todos={todoData} />
    </div>
  );
};

export default App;