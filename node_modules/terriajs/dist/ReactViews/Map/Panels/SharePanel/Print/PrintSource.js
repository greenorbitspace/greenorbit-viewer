import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import dateFormat from "dateformat";
const PrintSource = (props) => {
    return (_jsxs("div", { children: [_jsxs("p", { children: ["This map was created using", " ", _jsx("a", { href: window.location.origin, children: window.location.origin }), " on", " ", dateFormat()] }), _jsxs("p", { children: ["An interactive version of this map can be found here:", " ", _jsx("a", { href: props.link, children: props.link })] })] }));
};
export default PrintSource;
//# sourceMappingURL=PrintSource.js.map