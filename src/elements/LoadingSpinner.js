import React from "react";
import styled from "styled-components";
import {CircularProgress} from "@material-ui/core"

const LoadingSpinner = (props) => {

    return (
      <Outer>
        <CircularProgress />
      </Outer>
    );
}

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export default LoadingSpinner;