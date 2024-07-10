import { useSelector } from "react-redux";
import { Avatar, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { Container } from "react-bootstrap";
import CategoryList from "../Admin/categories/components/CategoryList";
import ProductList from "../Admin/products/components/ProductList";
import Logo from "../Components/ui/Logo";
import Logout from "../Components/ui/Logout";
import UploadProgressModal from "../Components/ui/UploadProgressModal";
import { adminLinks } from "../Helpers";

function Admin() {
  const { user } = useSelector((state) => state.userSlice);
  const location = useLocation();

  const { Content, Sider, Header } = Layout;

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
      case "/":
        return <CategoryList />;
      case "/products":
        return <ProductList />;
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
      <UploadProgressModal />

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
        <Header
          className="d-flex align-items-center justify-content-between bg-white"
          style={{ boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.2)" }}
        >
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
          <Container>
            {renderContent()}
          </Container>
        </Content>
      </Layout>
    </Layout>
  );
}
export default Admin;
