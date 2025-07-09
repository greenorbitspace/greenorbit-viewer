import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import Box from "../../../Styled/Box";
import { RawButton } from "../../../Styled/Button";
const Section = styled(Box).attrs({
    paddedHorizontally: true
}) ``;
const StyledText = styled.span `
  font-family: ${(props) => props.theme.fontMono};
  color: ${(props) => props.theme.textLight};
  white-space: nowrap;
  font-size: 0.7rem;
  padding: 0 5px 0 5px;
`;
const setInnerText = (ref, value) => {
    if (ref.current)
        ref.current.innerText = value;
};
export const LocationBar = observer(({ mouseCoords }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const elevationRef = useRef(null);
    const longitudeRef = useRef(null);
    const latitudeRef = useRef(null);
    const utmZoneRef = useRef(null);
    const eastRef = useRef(null);
    const northRef = useRef(null);
    useEffect(() => {
        const disposer = mouseCoords.updateEvent.addEventListener(() => {
            var _a, _b, _c, _d, _e, _f;
            setInnerText(elevationRef, (_a = mouseCoords.elevation) !== null && _a !== void 0 ? _a : "");
            setInnerText(longitudeRef, (_b = mouseCoords.longitude) !== null && _b !== void 0 ? _b : "");
            setInnerText(latitudeRef, (_c = mouseCoords.latitude) !== null && _c !== void 0 ? _c : "");
            setInnerText(utmZoneRef, (_d = mouseCoords.utmZone) !== null && _d !== void 0 ? _d : "");
            setInnerText(eastRef, (_e = mouseCoords.east) !== null && _e !== void 0 ? _e : "");
            setInnerText(northRef, (_f = mouseCoords.north) !== null && _f !== void 0 ? _f : "");
        });
        return disposer;
    });
    return (_jsx(Box, { styledHeight: "30px", col: true, verticalCenter: true, css: `
          padding-top: 3px;
          padding-bottom: 3px;
        `, children: _jsxs(RawButton, { css: `
            display: flex;
            align-items: center;
            height: 100%;
            &:hover {
              background: ${theme.colorPrimary};
            }
          `, onClick: mouseCoords.toggleUseProjection, children: [!mouseCoords.useProjection ? (_jsxs(_Fragment, { children: [_jsxs(Section, { centered: true, children: [_jsx(StyledText, { children: t("legend.lat") }), _jsx(StyledText, { ref: latitudeRef, children: mouseCoords.latitude })] }), _jsxs(Section, { centered: true, children: [_jsx(StyledText, { children: t("legend.lon") }), _jsx(StyledText, { ref: longitudeRef, children: mouseCoords.longitude })] })] })) : (_jsxs(_Fragment, { children: [_jsxs(Section, { children: [_jsx(StyledText, { children: t("legend.zone") }), _jsx(StyledText, { ref: utmZoneRef, children: mouseCoords.utmZone })] }), _jsxs(Section, { children: [_jsx(StyledText, { children: t("legend.e") }), _jsx(StyledText, { ref: eastRef, children: mouseCoords.east })] }), _jsxs(Section, { children: [_jsx(StyledText, { children: t("legend.n") }), _jsx(StyledText, { ref: northRef, children: mouseCoords.north })] })] })), _jsxs(Section, { children: [_jsx(StyledText, { children: t("legend.elev") }), _jsx(StyledText, { ref: elevationRef, children: mouseCoords.elevation })] })] }) }));
});
//# sourceMappingURL=LocationBar.js.map