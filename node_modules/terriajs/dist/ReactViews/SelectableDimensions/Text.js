import { jsx as _jsx } from "react/jsx-runtime";
import { runInAction } from "mobx";
import CommonStrata from "../../Models/Definition/CommonStrata";
import Input from "../../Styled/Input";
export const SelectableDimensionText = ({ id, dim }) => {
    return (_jsx(Input, { styledHeight: "34px", light: true, border: true, name: id, value: dim.value, onChange: (evt) => {
            runInAction(() => dim.setDimensionValue(CommonStrata.user, evt.target.value));
        } }));
};
//# sourceMappingURL=Text.js.map