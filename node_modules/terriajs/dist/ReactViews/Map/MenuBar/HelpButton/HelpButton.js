import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Icon from "../../../../Styled/Icon";
import Text from "../../../../Styled/Text";
import Prompt from "../../../Generic/Prompt";
import { useViewState } from "../../../Context";
import Styles from "./help-button.scss";
const HelpButton = observer(() => {
    const { t } = useTranslation();
    const viewState = useViewState();
    return (_jsxs("div", { children: [_jsxs("button", { className: Styles.helpBtn, onClick: (evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    viewState.showHelpPanel();
                }, children: [_jsx(Icon, { glyph: Icon.GLYPHS.helpThick }), _jsx("span", { children: t("helpPanel.btnText") })] }), _jsx(Prompt, { content: _jsx("div", { children: _jsx(Text, { bold: true, extraLarge: true, textLight: true, children: t("helpPanel.promptMessage") }) }), displayDelay: 500, dismissText: t("helpPanel.dismissText"), dismissAction: () => viewState.toggleFeaturePrompt("help", false, true), caretTopOffset: -8, caretLeftOffset: 130, caretSize: 15, promptWidth: 273, promptTopOffset: 50, promptLeftOffset: -100, isVisible: viewState.featurePrompts.indexOf("help") >= 0 })] }));
});
export default HelpButton;
//# sourceMappingURL=HelpButton.js.map