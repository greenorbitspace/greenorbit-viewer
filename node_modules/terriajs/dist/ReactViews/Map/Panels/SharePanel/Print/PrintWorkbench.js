import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import CatalogMemberMixin, { getName } from "../../../../../ModelMixins/CatalogMemberMixin";
import DiscretelyTimeVaryingMixin from "../../../../../ModelMixins/DiscretelyTimeVaryingMixin";
import MappableMixin from "../../../../../ModelMixins/MappableMixin";
import SelectableDimensions, { DEFAULT_PLACEMENT, filterSelectableDimensions, findSelectedValueName, isGroup } from "../../../../../Models/SelectableDimensions/SelectableDimensions";
import Legend from "../../../../Workbench/Controls/Legend";
const renderDisplayVariables = (catalogItem) => {
    if (SelectableDimensions.is(catalogItem)) {
        return filterSelectableDimensions(DEFAULT_PLACEMENT)(catalogItem.selectableDimensions).map((dim, key) => !isGroup(dim) ? (_jsxs("div", { children: [dim.name, ": ", findSelectedValueName(dim)] }, key)) : null);
    }
    return null;
};
const renderLegend = (catalogItem) => {
    if (!MappableMixin.isMixedInto(catalogItem)) {
        return null;
    }
    return (_jsxs("div", { className: "layer-legends", children: [_jsx("div", { className: "layer-title", children: getName(catalogItem) }), DiscretelyTimeVaryingMixin.isMixedInto(catalogItem) && (_jsxs("div", { className: "layer-time", children: ["Time: ", catalogItem.currentTime] })), CatalogMemberMixin.isMixedInto(catalogItem) && (_jsx(Legend, { forPrint: true, item: catalogItem }))] }, catalogItem.uniqueId));
};
const WorkbenchItem = ({ item }) => {
    return (_jsxs("div", { className: "WorkbenchItem", children: [_jsx("h3", { children: getName(item) }), renderDisplayVariables(item), _jsx("div", { children: renderLegend(item) })] }));
};
const PrintWorkbench = (props) => {
    return (_jsx(_Fragment, { children: props.workbench.items.map((item, index) => (_jsx(WorkbenchItem, { item: item }, index))) }));
};
export default PrintWorkbench;
//# sourceMappingURL=PrintWorkbench.js.map