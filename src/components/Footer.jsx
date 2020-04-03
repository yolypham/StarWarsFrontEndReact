import React from "react";
import styled from "@emotion/styled";
import {Height,  Color, FontSize} from "../styles/config";

const Root = styled.div`
  align-items: center;
  background-color: ${Color.footerBackground};
  display: flex;
  font-size: ${FontSize.xxs};
  height: ${Height.siteFooter};
  justify-content: center;
`;

export default function Footer() {

  return (
    <Root>
        {'Copyright © Yoly Pham '} {new Date().getFullYear()}
        {'.'}
    </Root>
  );
}

