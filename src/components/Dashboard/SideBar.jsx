import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const { Sider } = Layout;

const SideBar = () => {
  const { collapsed } = useStore();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("rememberMe");
    setToken("");
    navigate("/login");
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="">
      <div className="flex justify-center items-center m-3">
        <img
          src="./logo1.png"
          alt=""
          height={45}
          width={45}
          className="bg-white border rounded-full p-1 mb-4"
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <MailOutlined />,
            label: "Tasks",
          },
          {
            key: "2",
            label: "profile",
            icon: <UserOutlined />,
            children: [
              {
                key: "3",
                label: "Logout",
                onClick: handleLogout,
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default SideBar;
