import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { ExternalLinkIcon } from "../../../Custom/ExternalLink";
import { Spacer } from "./Spacer";
export const Credit = ({ credit, lastElement }) => {
    const { t } = useTranslation();
    return (_jsxs(_Fragment, { children: [_jsxs("a", { target: "_blank", rel: "noopener noreferrer", href: credit.url, children: [t(credit.text), " ", _jsx(ExternalLinkIcon, {})] }, credit.url), !lastElement ? _jsx(Spacer, {}) : null] }));
};
//# sourceMappingURL=Credit.js.map