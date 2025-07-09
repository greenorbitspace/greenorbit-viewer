import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import Button from "../../Styled/Button";
import { StyledIcon } from "../../Styled/Icon";
import Text from "../../Styled/Text";
const FeatureInfoPanelButton = (props) => {
    const { text, icon } = props;
    if (!text) {
        return null;
    }
    return (_jsx(StyledButton, { onClick: props.onClick, title: props.title, shortMinHeight: true, renderIcon: icon
            ? () => (_jsx(StyledIcon, { light: true, styledWidth: "20px", styledHeight: "20px", glyph: icon }))
            : undefined, children: text && _jsx(Text, { textLight: true, children: text }) }));
};
const StyledButton = styled(Button).attrs({
    primary: true
}) `
  margin: 0 3px;
  border-radius: 4px;
  min-height: 32px;
`;
export default FeatureInfoPanelButton;
//# sourceMappingURL=FeatureInfoPanelButton.js.map