import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { MdDeleteSweep, MdEdit } from "react-icons/md";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import { Modal } from "antd";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { api, userId, loading, setLoading } = useAuth();
  const { setEditTask } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${api}/task/${userId}`);
        setTasks(response.data.tasks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [api, userId, setLoading]);

  const [openModalId, setOpenModalId] = useState(null);

  const openModal = (taskId) => {
    setOpenModalId(taskId);
  };

  const closeModal = () => {
    navigate("/");
  };
  return (
    <div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
          {tasks.map((task) => (
            <div key={task._id} className=" ">
              <Task task={task} tasks={tasks} setTasks={setTasks} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
