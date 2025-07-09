import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { runInAction } from "mobx";
import Box from "../../Styled/Box";
import { RawButton } from "../../Styled/Button";
import Spacing from "../../Styled/Spacing";
import { TextSpan } from "../../Styled/Text";
import FeedbackLinkCustomComponent, { FeedbackLink } from "../Custom/FeedbackLinkCustomComponent";
import parseCustomMarkdownToReact from "../Custom/parseCustomMarkdownToReact";
// Hard code colour for now
const warningColor = "#f69900";
const showErrorNotification = (viewState, error) => {
    runInAction(() => {
        error.showDetails = true;
    });
    viewState.terria.raiseErrorToUser(error, undefined, true);
};
const WarningBox = (props) => {
    var _a, _b, _c, _d, _e, _f;
    // We only show FeedbankLink if the error message doesn't include the <feedbacklink> custom component (so we don't get duplicates)
    const includesFeedbackLink = (_a = props.error) === null || _a === void 0 ? void 0 : _a.highestImportanceError.message.includes(`<${FeedbackLinkCustomComponent.componentName}`);
    return (_jsxs(Box, { backgroundColor: warningColor, rounded: true, padded: true, children: [_jsx(Spacing, { right: 1 }), _jsx(WarningIcon, {}), _jsx(Spacing, { right: 2 }), _jsx(Box, { backgroundColor: "#ffffff", rounded: true, fullWidth: true, paddedRatio: 3, children: props.error ? (_jsxs("div", { children: [parseCustomMarkdownToReact(`### ${(_c = (_b = props.error) === null || _b === void 0 ? void 0 : _b.highestImportanceError) === null || _c === void 0 ? void 0 : _c.title}`), parseCustomMarkdownToReact((_e = (_d = props.error) === null || _d === void 0 ? void 0 : _d.highestImportanceError) === null || _e === void 0 ? void 0 : _e.message, { viewState: props.viewState, terria: (_f = props.viewState) === null || _f === void 0 ? void 0 : _f.terria }), props.viewState && !includesFeedbackLink ? (_jsx(FeedbackLink, { viewState: props.viewState })) : null, props.viewState &&
                            Array.isArray(props.error.originalError) &&
                            props.error.originalError.length > 0 ? (_jsx("div", { children: _jsx(RawButton, { activeStyles: true, onClick: () => showErrorNotification(props.viewState, props.error), children: _jsx(TextSpan, { primary: true, children: "See details" }) }) })) : null] })) : (props.children) })] }));
};
// Equilateral triangle
const WarningIcon = () => (_jsx("p", { css: `
      width: 0px;
      height: 0px;
      text-indent: -2px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 20px solid white;
      font-weight: bold;
      line-height: 25px;
      user-select: none;
    `, children: "!" }));
export default WarningBox;
//# sourceMappingURL=WarningBox.js.map