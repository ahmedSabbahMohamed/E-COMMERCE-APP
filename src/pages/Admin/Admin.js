import { Avatar, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { adminLinks } from "../../data/constants";
import { RxAvatar } from "react-icons/rx";
import Logo from "../../components/ui/Logo";
import Logout from "../../components/ui/Logout";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Categories from "./Categories";
import Products from "./Products";

const { Content, Sider, Header } = Layout;

function Admin() {
  const { user } = useSelector((state) => state.authSlice);
  const location = useLocation();

  const items = adminLinks.map((link) => ({
    key: String(link.id),
    icon: link.icon,
    label: (
      <Link className="text-decoration-none" to={link.path}>
        {link.link}
      </Link>
    ),
  }));

  const renderContent = () => {
    switch (location.pathname) {
      case "/admin":
        return <Categories />;
      case "/admin/products":
        return <Products />;
      default:
        return <div>Welcome to Admin Dashboard</div>;
    }
  };

  const getDefaultSelectedKey = () => {
    const link = adminLinks.find((link) => link.path === location.pathname);
    return link ? String(link.id) : "1";
  };

  return (
    <Layout>

      <Sider
        breakpoint="lg"
        collapsedWidth="75"
        theme="light"
        className="vh-100 position-sticky left-0 top-0 shadow"
      >
        <div className="text-center">
          <Logo />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[getDefaultSelectedKey()]}
          items={items}
        />
      </Sider>

      <Layout className="min-vh-100 bg-white">
        
        <Header className="d-flex align-items-center justify-content-between position-sticky top-0 z-3 px-1 px-md-5 bg-transparent contianer mx-auto w-100">
          <div className="d-flex align-items-center gap-2">
            <Avatar
              icon={
                user?.picture ? (
                  <img
                    className="w-100 h-100"
                    src={user.picture}
                    alt={user.picture}
                  />
                ) : (
                  <RxAvatar size={"26"} />
                )
              }
            />
            {user ? user?.name : "unknown"}
          </div>
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <Logout />
          </div>
        </Header>

        <Content className="py-3 d-flex align-items-center justify-content-center">
          <Container className="p-3">{renderContent()}</Container>
        </Content>

      </Layout>
      
    </Layout>
  );
}
export default Admin;
