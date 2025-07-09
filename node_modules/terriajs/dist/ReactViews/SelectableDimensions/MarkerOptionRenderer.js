import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getMakiIcon } from "../../Map/Icons/Maki/MakiIcons";
export const MarkerOptionRenderer = (option) => {
    var _a;
    return (_jsxs("div", { children: [_jsx("img", { width: "20px", height: "20px", style: { marginBottom: -5 }, src: (_a = getMakiIcon(option.value, "#000", 1, "#fff", 24, 24)) !== null && _a !== void 0 ? _a : option.value }), " ", option.value] }));
};
//# sourceMappingURL=MarkerOptionRenderer.js.map