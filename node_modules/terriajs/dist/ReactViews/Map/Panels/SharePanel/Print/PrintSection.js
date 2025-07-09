import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Box from "../../../../../Styled/Box";
import { TextSpan } from "../../../../../Styled/Text";
import Button from "../../../../../Styled/Button";
import { downloadImg } from "./PrintView";
export const PrintSection = ({ viewState }) => {
    const { t } = useTranslation();
    const [isDownloading, setIsDownloading] = useState(false);
    const printView = () => {
        const newWindow = window.open();
        viewState.setPrintWindow(newWindow);
    };
    const downloadMap = () => {
        setIsDownloading(true);
        viewState.terria.currentViewer
            .captureScreenshot()
            .then((dataString) => {
            downloadImg(dataString);
        })
            .finally(() => setIsDownloading(false));
    };
    return (_jsxs(Box, { column: true, children: [_jsx(TextSpan, { medium: true, children: t("share.printTitle") }), _jsx(Explanation, { children: t("share.printExplanation") }), _jsxs(Box, { gap: true, children: [_jsx(PrintButton, { primary: true, fullWidth: true, disabled: isDownloading, onClick: downloadMap, children: _jsx(TextSpan, { medium: true, children: t("share.downloadMap") }) }), _jsx(PrintButton, { primary: true, fullWidth: true, onClick: printView, children: _jsx(TextSpan, { medium: true, children: t("share.printViewButton") }) })] })] }));
};
const PrintButton = styled(Button) `
  border-radius: 4px;
`;
const Explanation = styled(TextSpan) `
  opacity: 0.8;
`;
//# sourceMappingURL=PrintSection.js.map