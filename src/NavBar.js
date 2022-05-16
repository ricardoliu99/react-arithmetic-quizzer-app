import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function NavBar() {
  const links = [
    {
      id: 1,
      path: "/",
      text: <MdHome />,
    },
    {
      id: 2,
      path: "/instructions",
      text: <BsFillQuestionCircleFill />,
    },
  ];

  return (
    <nav>
      <ul>
        {links.map((link) => {
          return (
            <li key={link.id}>
              <NavLink to={link.path} className="navbar-items">
                {link.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
