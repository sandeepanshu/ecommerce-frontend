import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div style={{ padding: 20, fontWeight: "bold" }}>
          Distributor System
        </div>

        <Menu mode="inline" defaultSelectedKeys={["products"]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="products" icon={<AppstoreOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
            Orders
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", textAlign: "right" }}>
          Welcome, Admin
        </Header>

        <Content style={{ margin: 20 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
