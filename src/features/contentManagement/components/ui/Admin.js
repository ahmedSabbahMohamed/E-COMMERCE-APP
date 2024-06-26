import React, { useEffect, useState } from "react";
import { Avatar, Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { adminLinks } from "../../../../data/constants";
import { RxAvatar } from "react-icons/rx";
import Logo from "../../../../components/ui/Logo";
import Logout from "../../../../components/ui/Logout";

function Admin() {
  const { Content, Sider, Header } = Layout;
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const items = adminLinks.map((link) => ({
    key: String(link.id),
    icon: link.icon,
    label: (
      <Link className="text-decoration-none" to={link.path}>
        {link.link}
      </Link>
    ),
  }));

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString("en-US", {
    month: "long",
  })} / ${currentDate.getDate()} / ${currentDate.getFullYear()}`;

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="75"
        className="vh-100 position-sticky left-0 top-0"
      >
        <div className="text-center">
          <Logo />
        </div>
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
      <Layout className="min-vh-100">
        <Header className="d-flex align-items-center justify-content-between bg-light shadow position-sticky top-0 z-3 px-1 px-md-5">
          <div className="d-flex align-items-center gap-3">
            <Avatar icon={<RxAvatar size={24} />} />
            {user ? user?.name : "unknown"}
          </div>
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <div>
              <p className="d-none d-sm-block p-0 m-0">{formattedDate}</p>
            </div>
            <Logout />
          </div>
        </Header>
        <Content className="rounded py-3">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
export default Admin;
