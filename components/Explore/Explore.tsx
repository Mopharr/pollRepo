import React, { useState } from "react";
import styles from "./styles.module.css";
import { ReactComponent as Explor } from "../../asset/svg/explore.svg";
import { Button } from "antd";
import { ReactComponent as Ads } from "../../asset/svg/promotion.svg";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";

interface NavLinkProps {
  isActive: boolean;
}

const Explore = () => {
  const [hoveredNavLink, setHoveredNavLink] = useState<string | null>(null);

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={25} height={25} />;
  };

  const getNavLinkClass = ({ isActive }: NavLinkProps) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  const handleMouseEnter = (name: string) => {
    setHoveredNavLink(name);
  };

  const handleMouseLeave = () => {
    setHoveredNavLink(null);
  };

  return (
    <div className={styles.sidebar1}>
      <div
        className={`${getNavLinkClass}`}
        onMouseEnter={() => handleMouseEnter("Explore")}
        onMouseLeave={handleMouseLeave}
      >
        <p
          className={getNavLinkClass({
            isActive: hoveredNavLink === "Explore",
          })}
        >
          <SvgIcon as={Explor} style={{ width: "25px", height: "25px" }} />
          <span style={{ fontSize: "20px", fontWeight: "700" }}>Explore</span>
          {hoveredNavLink === "Explore" && (
            <span className={styles.tooltip}>Explore</span>
          )}
        </p>
      </div>

      <div className={styles.exploreBottom}>
        <p className={styles.exploreBottomText}>
          Create an account to follow your favourite communities and start
          taking part in polls.
        </p>
        <Button className={styles.exploreButton}>Join Poll Repo</Button>
      </div>

      <NavLink
        to="advertise"
        className={`${getNavLinkClass} ${styles.mobileNav}`}
        onMouseEnter={() => handleMouseEnter("advertise")}
        onMouseLeave={handleMouseLeave}
      >
        <p
          className={getNavLinkClass({
            isActive: hoveredNavLink === "advertise",
          })}
        >
          <SvgIcon as={Ads} style={{ width: "25px", height: "25px" }} />
          <span style={{ fontSize: "20px", fontWeight: "700" }}>Advertise</span>
          {hoveredNavLink === "advertise" && (
            <span className={styles.tooltip}>advertise</span>
          )}
        </p>
      </NavLink>
      <div
        className={`${getNavLinkClass} ${styles.mobileNav}`}
        onMouseEnter={() => handleMouseEnter("create")}
        onMouseLeave={handleMouseLeave}
      >
        <p
          className={getNavLinkClass({
            isActive: hoveredNavLink === "create",
          })}
        >
          <SvgIcon
            as={CiCirclePlus}
            style={{ width: "25px", height: "25px" }}
          />
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            Create Polls
          </span>
          {hoveredNavLink === "create" && (
            <span className={styles.tooltip}>Creat Polls</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Explore;
