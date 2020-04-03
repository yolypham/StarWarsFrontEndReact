import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {Height, LineHeight, Color, FontSize, FontWeight} from "../styles/config";
import UserIcon from "./userIcon";

const Root = styled.div`
  align-items: center;
  background-color: ${Color.headerBackground};
  border-bottom: 1px solid ${Color.defaultButton};
  display: flex;
  flex-flow: row;
  height: ${Height.siteHeader};
  justify-content: space-between;
`;

const Logo = styled.div`
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: ${FontSize.x3l};
  font-weight: ${FontWeight.bold};
  line-height: ${LineHeight.normal};
`;

const User = styled.div`
  margin-right: 10px;
`;

export default function Header(props) {
  const { title } = props;

  const userid = sessionStorage.getItem("userid");

  return (
    <Root>
      <Logo>{""}</Logo>
      <Title>{title}</Title>
      <User>
        Guest <UserIcon userid={userid} />
      </User>
    </Root>
  );
}

Header.propTypes = {
  title: PropTypes.string
};
