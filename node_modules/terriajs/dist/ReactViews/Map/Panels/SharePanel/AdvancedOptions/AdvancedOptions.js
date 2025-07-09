import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Box from "../../../../../Styled/Box";
import { RawButton } from "../../../../../Styled/Button";
import { GLYPHS, StyledIcon } from "../../../../../Styled/Icon";
import Spacing from "../../../../../Styled/Spacing";
import { TextSpan } from "../../../../../Styled/Text";
import { StyledHr } from "../StyledHr";
import Checkbox from "../../../../../Styled/Checkbox";
import { EmbedSection } from "./EmbedSection";
export const AdvancedOptions = ({ canShortenUrl, shouldShorten, includeStoryInShare, includeStoryInShareOnChange, shouldShortenOnChange, shareUrl }) => {
    const { t } = useTranslation();
    const [advancedOptions, setAdvancedOptions] = useState(false);
    const toogleAdvancedOptions = () => {
        setAdvancedOptions((prevState) => !prevState);
    };
    return (_jsxs(Box, { column: true, children: [_jsxs(RawButton, { onClick: toogleAdvancedOptions, css: `
          display: flex;
          align-items: center;
        `, children: [_jsx(TextSpan, { fullWidth: true, medium: true, css: `
            display: flex;
          `, children: t("share.btnAdvanced") }), advancedOptions ? (_jsx(AdvanceOptionsIcon, { glyph: GLYPHS.opened })) : (_jsx(AdvanceOptionsIcon, { glyph: GLYPHS.closed }))] }), advancedOptions && (_jsxs(_Fragment, { children: [_jsx(StyledHr, {}), _jsxs(Box, { column: true, children: [_jsx(Checkbox, { textProps: { medium: true }, id: "includeStory", title: "Include Story in Share", isChecked: includeStoryInShare, onChange: includeStoryInShareOnChange, children: _jsx(TextSpan, { children: t("includeStory.message") }) }), _jsx(Spacing, { bottom: 1 }), _jsx(Checkbox, { textProps: { medium: true }, id: "shortenUrl", isChecked: shouldShorten, onChange: shouldShortenOnChange, isDisabled: !canShortenUrl, children: _jsx(TextSpan, { children: t("share.shortenUsingService") }) }), _jsx(Spacing, { bottom: 2 }), _jsx(EmbedSection, { shareUrl: shareUrl === null || shareUrl === void 0 ? void 0 : shareUrl.current })] })] }))] }));
};
const AdvanceOptionsIcon = styled(StyledIcon).attrs({
    styledWidth: "10px",
    light: true
}) ``;
//# sourceMappingURL=AdvancedOptions.js.map