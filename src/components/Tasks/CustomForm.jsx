import { Form, Input, Button, Select } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const CustomForm = ({ actionType, initialValues, onSubmit, buttonText }) => {
  const [form] = Form.useForm();
  const { loading, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter the title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter the description" }]}
      >
        <TextArea rows={6} />
      </Form.Item>
      {(actionType === "create" || actionType === "update") && (
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status" }]}
        >
          <Select>
            <Option value="in progress">In Progress</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <div className="grid sm:grid-cols-2 gap-3">
          <Button
            type="primary"
            className="w-full"
            htmlType="submit"
            loading={loading}
          >
            {buttonText}
          </Button>
          <Button
            type="primary"
            className="w-full "
            danger
            onClick={() => navigate("/")}
          >
            cancel
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
