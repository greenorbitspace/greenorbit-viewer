import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "../../../../Styled/Box";
import Spacing from "../../../../Styled/Spacing";
import Text from "../../../../Styled/Text";
import { useCallbackRef } from "../../../useCallbackRef";
import { AdvancedOptions } from "./AdvancedOptions";
import { canShorten } from "./BuildShareLink";
import { PrintSection } from "./Print/PrintSection";
import { shouldShorten as shouldShortenDefault } from "./SharePanel";
import { ShareUrl, ShareUrlBookmark } from "./ShareUrl";
import { StyledHr } from "./StyledHr";
export const SharePanelContent = ({ terria, viewState, closePanel }) => {
    const { t } = useTranslation();
    const canShortenUrl = useMemo(() => !!canShorten(terria), [terria]);
    const [includeStoryInShare, setIncludeStoryInShare] = useState(true);
    const [shouldShorten, setShouldShorten] = useState(shouldShortenDefault(terria));
    const [_, update] = useState();
    const shareUrlRef = useCallbackRef(null, () => update({}));
    const includeStoryInShareOnChange = useCallback(() => {
        setIncludeStoryInShare((prevState) => !prevState);
    }, []);
    const shouldShortenOnChange = useCallback(() => {
        setShouldShorten((prevState) => {
            terria.setLocalProperty("shortenShareUrls", !prevState);
            return !prevState;
        });
    }, [terria]);
    return (_jsxs(Box, { paddedRatio: 2, column: true, children: [_jsx(Text, { medium: true, children: t("clipboard.shareURL") }), _jsx(Spacing, { bottom: 1 }), _jsx(ShareUrl, { theme: "dark", inputTheme: "dark", terria: terria, viewState: viewState, includeStories: includeStoryInShare, shouldShorten: shouldShorten, ref: shareUrlRef, callback: closePanel, children: _jsx(ShareUrlBookmark, { viewState: viewState }) }), _jsx(Spacing, { bottom: 2 }), _jsx(PrintSection, { viewState: viewState }), _jsx(StyledHr, {}), _jsx(AdvancedOptions, { canShortenUrl: canShortenUrl, shouldShorten: shouldShorten, shouldShortenOnChange: shouldShortenOnChange, includeStoryInShare: includeStoryInShare, includeStoryInShareOnChange: includeStoryInShareOnChange, shareUrl: shareUrlRef })] }));
};
//# sourceMappingURL=SharePanelContent.js.map