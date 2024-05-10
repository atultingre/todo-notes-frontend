import axios from "axios";
import CustomForm from "./CustomForm";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";

const UpdateTask = () => {
  const { api, userId } = useAuth();
  const { editTask } = useStore();

  return (
    <CustomForm
      actionType="update"
      initialValues={{
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
      }}
      onSubmit={async (values) => {
        const response = await axios.post(
          `${api}/task/${userId}/update/${editTask._id}`,
          values
        );
        console.log("Task created:", response.data);
      }}
      buttonText="Update Task"
    />
  );
};

export default UpdateTask;
