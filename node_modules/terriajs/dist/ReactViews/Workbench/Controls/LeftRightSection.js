import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useTranslation, withTranslation } from "react-i18next";
import styled from "styled-components";
import defined from "terriajs-cesium/Source/Core/defined";
import SplitDirection from "terriajs-cesium/Source/Scene/SplitDirection";
import CommonStrata from "../../../Models/Definition/CommonStrata";
import hasTraits from "../../../Models/Definition/hasTraits";
import Box from "../../../Styled/Box";
import { RawButton } from "../../../Styled/Button";
import Spacing from "../../../Styled/Spacing";
import SplitterTraits from "../../../Traits/TraitsClasses/SplitterTraits";
const LeftRightButton = styled(RawButton).attrs({
    fullWidth: true
}) `
  text-align: center;
  padding: 5px;
  color: ${(p) => p.theme.textLight};
  background-color: ${(p) => p.theme.dark};
  ${(p) => p.isActive &&
    `
    background-color: ${p.theme.colorSecondary};
  `}
  &:hover,
  &:focus {
    background-color: ${(p) => p.theme.colorSecondary};
  }
`;
const LeftRightSection = observer(({ item }) => {
    const goLeft = () => {
        runInAction(() => {
            item.setTrait(CommonStrata.user, "splitDirection", SplitDirection.LEFT);
        });
    };
    const goBoth = () => {
        runInAction(() => {
            item.setTrait(CommonStrata.user, "splitDirection", SplitDirection.NONE);
        });
    };
    const goRight = () => {
        runInAction(() => {
            item.setTrait(CommonStrata.user, "splitDirection", SplitDirection.RIGHT);
        });
    };
    const { t } = useTranslation();
    const splitDirection = item.splitDirection;
    if (!hasTraits(item, SplitterTraits, "splitDirection") ||
        item.disableSplitter ||
        !defined(splitDirection) ||
        !item.terria.showSplitter) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(Spacing, { bottom: 3 }), _jsxs(Box, { children: [_jsx(LeftRightButton, { type: "button", onClick: goLeft, title: t("splitterTool.workbench.goleftTitle"), isActive: splitDirection === SplitDirection.LEFT, children: t("splitterTool.workbench.goleft") }), _jsx(LeftRightButton, { type: "button", onClick: goBoth, title: t("splitterTool.workbench.bothTitle"), isActive: splitDirection === SplitDirection.NONE, children: t("splitterTool.workbench.both") }), _jsx(LeftRightButton, { type: "button", onClick: goRight, title: t("splitterTool.workbench.gorightTitle"), isActive: splitDirection === SplitDirection.RIGHT, children: t("splitterTool.workbench.goright") })] })] }));
});
export default withTranslation()(LeftRightSection);
//# sourceMappingURL=LeftRightSection.js.map