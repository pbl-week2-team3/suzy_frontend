import React from "react";
import styled, {css} from "styled-components";

const FloatingButton = (props) => {

    const {active, backgroundColor, size, children} = props;

    const styles = {
        backgroundColor: backgroundColor,
        size: size,
        active: active
    }

    return (
        <B {...styles}>
            {children}
        </B>
    );
};

FloatingButton.defaultProps = {
    backgroundColor: "#FFD600",
    size: 52,
    active: false
}

const B = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-color: ${(props) => props.backgroundColor};

    font-size: var(--size);
    font-weight: 600;
    line-height: calc(var(--size) * 0.8);
    text-align: center;

    position: fixed;
    bottom:20px; right: 20px;

    ${props => props.active ? css`` : css`display:none;`}
`;

export default FloatingButton;


