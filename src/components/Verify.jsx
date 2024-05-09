import { useRef, useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Verify() {
  const [loading, setLoading] = useState(false);
  const { setResetToken, api } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/user/verify`, values);
      console.log(response.data);
      if (response.data.success === true) {
        setResetToken(response.data.token);
        navigate("/forgot-password");
      }
    } catch (error) {
      console.log("error: ", error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="./logo1.png"
            alt="Tingre Shop"
          />
          <h2 className="mt-2 text-center text-md font-bold leading-9 tracking-tight text-gray-900">
            Verify user
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form onFinish={onFinish} ref={formRef} layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input />
            </Form.Item>
            <div className=" flex flex-col gap-3">
              <div className="w-full">
                <Button
                  type="primary"
                  className="w-full"
                  htmlType="submit"
                  loading={loading}
                >
                  Verify
                </Button>
              </div>
              <div className=" w-full">
                <Button
                  className=" w-full"
                  onClick={() => navigate("/")}
                  loading={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Verify;
