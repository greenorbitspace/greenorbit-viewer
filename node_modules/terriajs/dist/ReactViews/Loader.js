import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { withTranslation } from "react-i18next";
import Box from "../Styled/Box";
import { TextSpan } from "../Styled/Text";
import AnimatedSpinnerIcon from "../Styled/AnimatedSpinnerIcon";
const Loader = (props) => {
    const { message, t, boxProps, textProps, hideMessage, ...rest } = props;
    return (_jsxs(Box, { fullWidth: true, centered: true, ...boxProps, children: [_jsx(AnimatedSpinnerIcon, { styledWidth: "15px", css: "margin: 5px", ...rest }), _jsx(TextSpan, { ...textProps, children: !hideMessage && (message || t("loader.loadingMessage")) })] }));
};
export default withTranslation()(Loader);
//# sourceMappingURL=Loader.js.map