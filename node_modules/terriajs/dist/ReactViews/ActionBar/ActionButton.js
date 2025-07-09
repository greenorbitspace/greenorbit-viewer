import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from "styled-components";
import AnimatedSpinnerIcon from "../../Styled/AnimatedSpinnerIcon";
import { StyledIcon } from "../../Styled/Icon";
import StyledButton from "./StyledButton";
/**
 * A themed button to use inside {@link ActionBar}
 */
export const ActionButton = ({ className, icon, showProcessingIcon, warning, isActive, ...props }) => {
    const theme = useTheme();
    return (_jsx(StyledButton, { className: className, backgroundColor: isActive ? theme.colorPrimary : theme.darkLighter, hoverBackgroundColor: warning ? "red" : theme.colorPrimary, renderIcon: showProcessingIcon
            ? () => _jsx(AnimatedSpinnerIcon, { styledWidth: "20px", styledHeight: "20px" })
            : icon
                ? () => (_jsx(StyledIcon, { light: true, styledWidth: "20px", styledHeight: "20px", glyph: icon }))
                : undefined, ...props }));
};
//# sourceMappingURL=ActionButton.js.map