import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Trans, useTranslation } from "react-i18next";
import triggerResize from "../../../../Core/triggerResize";
import Icon from "../../../../Styled/Icon";
import Text from "../../../../Styled/Text";
import Prompt from "../../../Generic/Prompt";
import { useRefForTerria } from "../../../Hooks/useRefForTerria";
import Styles from "./story-button.scss";
const STORY_BUTTON_NAME = "MenuBarStoryButton";
export const onStoryButtonClick = (props) => () => {
    props.viewState.toggleStoryBuilder();
    props.terria.currentViewer.notifyRepaintRequired();
    // Allow any animations to finish, then trigger a resize.
    setTimeout(function () {
        triggerResize();
    }, props.animationDuration || 1);
    props.viewState.toggleFeaturePrompt("story", false, true);
};
const promptHtml = (hasStories) => (_jsx(Text, { textLight: true, textAlignCenter: true, children: hasStories ? (_jsx(Trans, { i18nKey: "story.promptHtml1", children: _jsx(Text, { extraLarge: true, children: "You can view and create stories at any time by clicking here." }) })) : (_jsx(Trans, { i18nKey: "story.promptHtml2", children: _jsxs("div", { children: [_jsx(Text, { children: "INTRODUCING" }), _jsx(Text, { bold: true, extraExtraLarge: true, styledLineHeight: "32px", children: "Data Stories" }), _jsx(Text, { medium: true, children: "Create and share interactive stories directly from your map." })] }) })) }));
const StoryButton = (props) => {
    const storyButtonRef = useRefForTerria(STORY_BUTTON_NAME, props.viewState);
    const storyEnabled = props.terria.configParameters.storyEnabled;
    const dismissAction = () => {
        props.viewState.toggleFeaturePrompt("story", false, true);
    };
    const delayTime = storyEnabled && props.terria.stories.length > 0 ? 1000 : 2000;
    const { t } = useTranslation();
    return (_jsxs("div", { children: [_jsxs("button", { ref: storyButtonRef, className: Styles.storyBtn, type: "button", onClick: onStoryButtonClick(props), "aria-expanded": props.viewState.storyBuilderShown, css: `
          ${(p) => p["aria-expanded"] &&
                    `&:not(.foo) {
                      background: ${p.theme.colorPrimary};
                      svg {
                        fill: ${p.theme.textLight};
                      }
                    }`}
        `, children: [_jsx(Icon, { glyph: Icon.GLYPHS.story }), _jsx("span", { children: t("story.story") })] }), _jsx(Prompt, { centered: true, isVisible: storyEnabled && props.viewState.featurePrompts.indexOf("story") >= 0, content: promptHtml(props.terria.stories.length > 0), displayDelay: delayTime, dismissText: t("story.dismissText"), dismissAction: dismissAction })] }));
};
export default StoryButton;
//# sourceMappingURL=StoryButton.js.map