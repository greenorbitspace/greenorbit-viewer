import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from "styled-components";
export const Spacer = () => {
    const theme = useTheme();
    return (_jsx("span", { "aria-hidden": "true", css: { color: theme.textLight }, children: "|" }));
};
//# sourceMappingURL=Spacer.js.map