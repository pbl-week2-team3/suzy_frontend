import React from "react";
import { LoadingSpinner } from "../elements";

const LazyImage = (props) => {

    const {width, height} = props;
    const [isLoading, setIsLoading] = React.useState(false);

    const imgRef = React.useRef(null);
    const observer = React.useRef();

    React.useEffect(() => {
        observer.current = new IntersectionObserver(IntersectionObserver);
        imgRef.current && observer.current.observe(imgRef.current);
    }, []);

    const intersectionObserver = (entries, io) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                io.unobserve(entry.target);
                setIsLoading(true);
            }
        });
    }

    return (
        <LoadingSpinner width={width} height={height} />
    );
}

export default LazyImage;