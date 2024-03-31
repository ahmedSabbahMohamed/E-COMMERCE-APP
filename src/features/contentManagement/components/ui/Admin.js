import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { adminLinks } from "../../../../data/constants";

function Admin() {
  const [collapse, setCollapse] = useState(false);
  const { Content, Sider } = Layout;
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 768 && collapse === false) {
      setCollapse(true);
    } else if (window.innerWidth > 769 && collapse === true) {
      setCollapse(false);
    }
  }, [window.innerWidth]);

  const items = adminLinks.map((link) => ({
    key: String(link.id),
    icon: link.icon,
    label: (
      <Link className="text-decoration-none" to={link.path}>
        {link.link}
      </Link>
    ),
  }));

  return (
    <Layout>
      <Sider
        collapsed={collapse}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          paddingTop: 15,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[
            String(
              adminLinks.findIndex((link) => link.path === location.pathname) +
                1
            ),
          ]}
          items={items}
        />
      </Sider>
      <Layout
        className="p-3"
        style={{
          marginLeft: `${collapse ? "80px" : "200px"}`,
        }}
      >
        <Content className="bg-white rounded p-3 shadow">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
export default Admin;
