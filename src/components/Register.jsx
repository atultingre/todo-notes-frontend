import { useRef } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const { loading, setLoading } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        values
      );
      console.log(response.data);
      // Handle successful registration, redirect, etc.
      message.success("Registration successful");
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="./logo1.png"
          alt="Tingre Shop"
        />
        <h2 className="mt-2 text-center text-md  font-bold leading-9 tracking-tight text-gray-900">
          Register to Todo Notes
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          ref={formRef}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <Typography className="flex justify-center">
          Already have an account? <NavLink to="/">&nbsp;Login</NavLink>
        </Typography>
      </div>
    </div>
  );
}

export default Register;
