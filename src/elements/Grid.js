import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const {isFlex, width, padding, margin, background, children} = props;

    const styles = {
        isFlex: isFlex,
        width: width,
        padding: padding,
        margin: margin,
        background: background
    };

    return (
        <React.Fragment>
            <GridBox {...styles}>
                {children}
            </GridBox>
        </React.Fragment>
    );
}

Grid.defaltProps = {
    children: null,
    isFlex : false,
    width: "10%",
    padding: false,
    margin: false,
    background: false
};

const GridBox = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;

    ${(props) => props.padding
        ? `padding: ${props.padding}`
        : ''
    }
    ${(props) => props.margin
        ? `margin: ${props.margin}`
        : ''
    }
    ${(props) => props.background
        ? `background-color: ${props.background}`
        : ''
    }

    ${(props) => props.isFlex
        ? `display:flex; align-items: center; justify-contents:space-between;`
        : ''
    }
`;

export default Grid;