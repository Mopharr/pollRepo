import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Layout, Button, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../asset/polls_ranking.png";
import Search from "@/asset/svg/search.svg";
import styles from "./Header.module.css";

const { Header } = Layout;
type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
  return <SvgComponent {...props} width={20} height={20} />;
};

const BrandIcon: React.FC = () => (
  <div className={styles.brandIcon}>
    <Image src={Logo} alt="polls_ranking" />
    <p className={styles.brandText}>Poll Repo</p>
  </div>
);

const UnAuthHeader: React.FC<{ onLoginClick: () => void }> = ({
  onLoginClick,
}) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isAtResetPassword =
    pathname === "/forgot-password" ||
    pathname.includes("/auth/password/reset/confirm") ||
    pathname === "/verify-email";

  return (
    <Header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link href="/">
          <BrandIcon />
        </Link>

        {!isAtResetPassword && (
          <div className={styles.inputWrapper}>
            <Image src={Search} alt="" />
            <input className={styles.searchBar} placeholder="Search..." />
          </div>
        )}

        <Space className={styles.loginSpace}>
          {!isAtResetPassword && (
            <Button onClick={onLoginClick} className={styles.login}>
              Login
            </Button>
          )}

          {isAtResetPassword && (
            <Button onClick={() => navigate("/")} className={styles.login}>
              Go Home
            </Button>
          )}
        </Space>
      </div>
    </Header>
  );
};

export default UnAuthHeader;
