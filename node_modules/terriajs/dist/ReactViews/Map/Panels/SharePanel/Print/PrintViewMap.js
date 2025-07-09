import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const PrintViewMap = (props) => {
    const [map, setMap] = useState(null);
    const [isError, setError] = useState(false);
    useEffect(() => {
        setMap(null);
        props.screenshot.then(setMap).catch(() => setError(true));
    }, [props.screenshot]);
    return isError ? (_jsx("div", { children: "Error has occured" })) : map ? (_jsxs("div", { className: "mapContainer", children: [_jsx("img", { className: "map-image", src: map, alt: "Map snapshot" }), props.children] })) : (_jsx("div", { children: "Loading" }));
};
export default PrintViewMap;
//# sourceMappingURL=PrintViewMap.js.map