import styled from "styled-components";
import izstop_logo from "../../assets/izstop_logo.png";
import { useState } from "react";
import "./header.scss";
// HamburgerMenu component

const COLORS = {
  primaryDark: "#115b4c",
  primaryLight: "#13a89e",
};

const MenuLabel = styled.label`
  width: 7rem;
  cursor: pointer;
  z-index: 1000;
  text-align: center;
`;
// background-color: ${COLORS.primaryLight};
// border-radius: 50%;
//   box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);

const NavBackground = styled.div`
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 3rem;
  height: 2px;
  display: inline-block;
  margin-top: 2.5rem;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 3rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled.a`
  display: inline-block;
  font-size: 3rem;
  font-weight: 300;
  text-decoration: none;
  text-tranform: uppercase;
  color: ${COLORS.primaryLight};
  padding: 1rem 2rem;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  cursor: pointer;
  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;

const FlexMenu = styled.section`
  display: flex;
  justify-content: space-between;
  background: transparent;
  position: absolute;
  width: 100%;
`;

const menu = [
  { id: 0, val: "Hosting and Dev" },
  { id: 1, val: "Web" },
  { id: 2, val: "VR" },
  { id: 3, val: "About us" },
];

export default function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const menuList = menu.map(({ id, val }) => (
    <li key={id}>
      <ItemLink onClick={handleClick} to="#">
        {val}
      </ItemLink>
    </li>
  ));

  return (
    <>
      <FlexMenu>
        <a href="/" className="logo-link">
          <img src={izstop_logo} alt="logo" className="img-logo" />
        </a>
        <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
          <Icon clicked={click}>&nbsp;</Icon>
        </MenuLabel>
      </FlexMenu>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <a href="/" className="logo-link">
          <img src={izstop_logo} alt="logo" className="img-logo" />
        </a>
        <List>{menuList}</List>
      </Navigation>
    </>
  );
}
