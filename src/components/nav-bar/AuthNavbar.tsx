import React from "react";
import MuiLink from "./link/Link";
import { useLocation, useMatch } from "react-router-dom";
import style from "./AuthNavbar.module.scss";
import { AUTH_ROUTES } from "@/constant/route";

const AuthNavbar = () => {
  return (
    <nav className="py-4 flex-grow max-w-[300px]">
      <ul className="space-y-4 py-4">
        {AUTH_ROUTES.map((route) => (
          <RouteLink key={route.id} {...route} />
        ))}
      </ul>
    </nav>
  );
};

export default AuthNavbar;

const RouteLink: React.FC<IRoute> = (props) => {
  const { id, href, title } = props;

  const match = useMatch(href);
  const { pathname } = useLocation();
  const isActive = match && pathname.startsWith(href);

  return (
    <li key={id}>
      <div className={`${style["main-link"]} ${isActive ? style["active"] : ""}`}>
        <MuiLink href={href}>{title}</MuiLink>
      </div>
    </li>
  );
};
