import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Drawer, Layout, Menu } from "antd";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
const { Sider } = Layout;

const SideBar = () => {
  const { collapsed, setCollapsed } = useStore();
  const { setToken, setUserId } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setCollapsed(true);
  };
  const onClose = () => {
    setCollapsed(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("userId");
    setToken("");
    setUserId("");
    navigate("/login");
  };

  return (
    // <Drawer
    //   title="Basic Drawer"
    //   placement={placement}
    //   closable={false}
    //   onClose={onClose}
    //   open={open}
    //   key={placement}
    // >
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
              onClick: () => navigate("/"),
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
    // </Drawer>
  );
};

export default SideBar;
