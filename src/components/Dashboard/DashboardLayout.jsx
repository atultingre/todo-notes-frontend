import { Layout } from "antd";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import DashboardContent from "./DashboardContent";

const DashboardLayout = ({ children }) => {
  return (
    <Layout className="min-h-[100vh]">
      <SideBar />
      <Layout>
        <NavBar />
        <DashboardContent />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
