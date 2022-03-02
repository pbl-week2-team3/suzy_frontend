import React from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
    const {children, callNext, isNext, loading} = props;

    const _handleScroll = _.throttle(() => {
        callNext();
    }, 100);

    const handleScroll = React.useCallback(_handleScroll, [loading]);

    React.useEffect(() => {
        if (loading) {
            return;
        }

        if (isNext) {
            window.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("scroll", handleScroll);
        }

        return () => window.removeEventListener("scroll", handleScroll);

    }, [isNext, loading]);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    isNext: false,
    loading: false
};

export default InfinityScroll;