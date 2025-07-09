import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react";
import Text from "../../../Styled/Text";
import { applyTranslationIfExists } from "../../../Language/languageHelpers";
import MinMaxLevelMixin from "../../../ModelMixins/MinMaxLevelMixin";
import { Spacing } from "../../../Styled/Spacing";
import { useTranslation } from "react-i18next";
export const ScaleWorkbenchInfo = observer(({ item }) => {
    const { i18n } = useTranslation();
    if (!MinMaxLevelMixin.isMixedInto(item) || !item.scaleWorkbenchInfo) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(Spacing, { bottom: 2 }), _jsx(Text, { children: applyTranslationIfExists(item.scaleWorkbenchInfo, i18n) })] }));
});
//# sourceMappingURL=ScaleWorkbenchInfo.js.map