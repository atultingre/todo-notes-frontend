import { useEffect, useRef, useState } from "react";
import { Form, Input, Button, message, Typography, Checkbox } from "antd";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const formRef = useRef(null);
  const { loading, setLoading } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        values
      );
      console.log(response.data);

      if (response.data.success === true) {
        localStorage.setItem("token", response.data.token);
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
      }
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldsValue({
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      });
    }
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="./logo1.png"
            alt="Tingre Shop"
          />
          <h2 className="mt-2 text-center  text-md font-bold leading-9 tracking-tight text-gray-900">
            Login to Todo Notes
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            name="login"
            onFinish={onFinish}
            ref={formRef}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email is required" }]}
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
            <div className="flex justify-between mb-2 mt-[-10px]">
              <div className="flex items-center gap-1  ">
                <Checkbox
                  name="remember"
                  checked={
                    rememberMe ? rememberMe : localStorage.getItem("rememberMe")
                  }
                  onChange={handleRememberMeChange}
                >
                  Remember me
                </Checkbox>
              </div>
              <div>
                <NavLink to={"/verify"} className="text-[blue]">
                  Forgot password
                </NavLink>
              </div>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <Form.Item className="flex justify-center ">
            <Typography>
              Dont have account? <NavLink to="/register">Register</NavLink>
            </Typography>
          </Form.Item>
        </div>
      </div>
    </>
  );
}

export default Login;
