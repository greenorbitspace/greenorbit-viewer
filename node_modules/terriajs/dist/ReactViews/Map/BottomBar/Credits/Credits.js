import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Credit } from "./Credit";
export const Credits = ({ credits }) => {
    if (!credits || credits.length === 0) {
        return null;
    }
    return (_jsx(_Fragment, { children: credits.map((credit, index) => (_jsx(Credit, { credit: credit, lastElement: index === credits.length - 1 }, index))) }));
};
//# sourceMappingURL=Credits.js.map