import React from "react";
import styled from "@emotion/styled";
import { BorderRadius, fontSize } from "@pulse/components/styles/config";
import PropTypes from "prop-types";

const Root = styled.span`
  background: ${props => props.theme.colors.iconUser};
  border-radius: ${BorderRadius.Circle};
  color: ${props => props.theme.colors.invertText};
  display: inline-block;
  font-size: ${fontSize.s};
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
  const { username } = props;
  return <Root>{getInitial(username)}</Root>;
}

UserIcon.propTypes = {
  username: PropTypes.string
};
