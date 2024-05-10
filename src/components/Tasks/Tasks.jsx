import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import TaskList from "./TaskList";

const Tasks = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-end w-full mb-3">
        <Button
          type="primary"
          className="w-40"
          onClick={() => navigate("/add-task")}
        >
          Add Task
        </Button>
      </div>
      <TaskList />
    </>
  );
};

export default Tasks;
