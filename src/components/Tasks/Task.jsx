import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { MdDeleteSweep, MdEdit } from "react-icons/md";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Card, Modal } from "antd";
import { useState } from "react";

const { Meta } = Card;

const Task = ({ task, setTasks }) => {
  const { api, userId } = useAuth();
  const { setEditTask } = useStore();
  const navigate = useNavigate();

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${api}/task/${userId}/delete/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    navigate("/update-task");
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Card
        onClick={showModal}
        title={task.title}
        bordered={true}
        actions={[
          <span key={"updatedAt"}>{formatDate(task.updatedAt)}</span>,
          <span
            key={"status"}
            className={`capitalize inline-flex items-center rounded-md ${
              task.status === "completed"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            } px-2 py-1 text-xs font-medium`}
          >
            {task.status}
          </span>,
          <div key={"actions"} className="flex justify-center gap-4 ">
            <button key={"edit"} onClick={() => handleEdit(task)}>
              <EditOutlined className="text-[15px] text-green-600" />
            </button>
            <button key={"delete"} onClick={() => handleDelete(task._id)}>
              <DeleteOutlined className="text-[15px] text-red-600" />
            </button>
          </div>,
        ]}
      >
        <span>{truncateText(task.description, 75)}</span>
      </Card>
      <Modal
        key={task._id}
        title={task.title}
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>{task.description} </p>
      </Modal>
    </>
  );
};

export default Task;
