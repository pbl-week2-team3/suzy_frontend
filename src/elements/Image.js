import React from "react";
import styled from "styled-components";

const Image = (props) => {

    const {shape, src, size} = props;

    const styles = {
        src: src,
        size: size,
    };

    if(shape === "circle") {
        return (
            <ImageCircle {...styles}></ImageCircle>
        );
    }

    if(shape === "retangle") {
        return (
            <AspectOuter>
                <AspectInner {...styles}></AspectInner>
            </AspectOuter>
        );
    }
};

Image.defaultProps = {
    shape: "circle",
	src: "https://c.tenor.com/Q5ETLkSFYfcAAAAC/chunsik-%EC%B6%98%EC%8B%9D.gif",
    size: 36,
};


const AspectOuter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;


const ImageCircle = styled.div`
    --size : ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;

`;

export default Image;