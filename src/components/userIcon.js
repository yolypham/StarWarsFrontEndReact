import React from "react";
import styled from "@emotion/styled";
import { BorderRadius, FontSize, Color } from "../styles/config";
import PropTypes from "prop-types";

const Root = styled.span`
  background: ${Color.iconUser};
  border-radius: ${BorderRadius.Circle};
  color: ${Color.invertText};
  display: inline-block;
  font-size: ${FontSize.s};
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  width: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;

function getInitial(name) {
  return name.substring(0, 1).toUpperCase();
}

export default function UserIcon(props) {
  const { userid } = props;
  return <Root>{getInitial(userid)}</Root>;
}

UserIcon.propTypes = {
  userid: PropTypes.string
};
