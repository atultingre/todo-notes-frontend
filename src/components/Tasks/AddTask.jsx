import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import CustomForm from "./CustomForm";

const AddTask = () => {
  const { api, userId } = useAuth();
  return (
    <CustomForm
      actionType="create"
      initialValues={{
        status: "in progress",
      }}
      onSubmit={async (values) => {
        const response = await axios.post(
          `${api}/task/${userId}/create`,
          values
        );
        console.log("Task created:", response.data);
      }}
      buttonText="Add Task"
    />
  );
};

export default AddTask;
