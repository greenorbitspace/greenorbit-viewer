import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../../Styled/Icon";
import Styles from "./mobile-menu-item.scss";
const MobileMenuItem = (props) => (_jsx("div", { className: Styles.root, children: props.href ? (_jsxs("a", { href: props.href, target: "_blank", rel: "noopener noreferrer", onClick: props.onClick, className: Styles.link, children: [props.caption, props.href !== "#" && _jsx(Icon, { glyph: Icon.GLYPHS.externalLink })] })) : (_jsxs("button", { onClick: props.onClick, className: Styles.link, children: [props.icon && _jsx(Icon, { className: Styles.icon, glyph: props.icon }), props.caption] })) }));
export default MobileMenuItem;
//# sourceMappingURL=MobileMenuItem.js.map