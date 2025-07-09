import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getName } from "../../../../../ModelMixins/CatalogMemberMixin";
import Description from "../../../../Preview/Description";
const PrintDatasets = (props) => {
    return (_jsx(_Fragment, { children: props.items.map((item, index) => (_jsxs("details", { open: true, children: [_jsx("summary", { children: getName(item) }), _jsx(Description, { item: item, printView: true }, index)] }, index))) }));
};
export default PrintDatasets;
//# sourceMappingURL=PrintDatasets.js.map