import { Layout, Menu, Typography } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./home.css";

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

const MyMenu = Menu as any; // Ugly, but will try fixing later. Maybe.
const MyLayout = Layout as any;
interface HomeProps {
    children: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children }) => {
    const location = useLocation();
    const activeNav = location.pathname.split("/")[1] || "case-records";

    return (
        <MyLayout style={{ height: "100vh" }}>
            <Sider>
                <MyMenu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[activeNav]}
                >
                    <div
                        style={{
                            textAlign: "center",
                            margin: "16px",
                            height: "32px"
                        }}
                    >
                        <Title level={3} style={{ color: "white" }}>
                            SSE Finder
                        </Title>
                    </div>

                    <MyMenu.Item key="case-records">
                        <Link to="/">Case Records</Link>
                    </MyMenu.Item>
                    <MyMenu.Item key="find-sse">
                        <Link to="/find-sse">Find SSEs</Link>
                    </MyMenu.Item>
                    <MyMenu.Item key="add-case">
                        <Link to="/add-case">Add Case</Link>
                    </MyMenu.Item>
                </MyMenu>
            </Sider>
            <MyLayout>
                <Header
                    className="site-layout-sub-header-background"
                    style={{ padding: 0 }}
                />
                <Content style={{ margin: "24px 16px 0" }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, height: '100%', overflowY: 'auto' }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Made by Group K.</Footer>
            </MyLayout>
        </MyLayout>
    );
};
