import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react";
import Icon, { StyledIcon } from "../../Styled/Icon";
import ButtonAsLabel from "../../Styled/ButtonAsLabel";
import Box from "../../Styled/Box";
import Text from "../../Styled/Text";
import Spacing from "../../Styled/Spacing";
import { useTranslation } from "react-i18next";
import withControlledVisibility from "../HOCs/withControlledVisibility";
import MappableMixin from "../../ModelMixins/MappableMixin";
const MapDataCount = observer(function (props) {
    const { t } = useTranslation();
    const { terria, viewState } = props;
    if (viewState.useSmallScreenInterface) {
        return null;
    }
    // Can't simply use number of items given they can exist in workbench
    // without being shown on map
    const numberOfDatasets = terria.workbench.items.filter((item) => {
        if (MappableMixin.isMixedInto(item)) {
            return item.show;
        }
    }).length;
    const hasMapData = numberOfDatasets !== 0;
    const mapDataText = hasMapData
        ? t("countDatasets.mapDataState", {
            count: numberOfDatasets
        })
        : t("countDatasets.noMapDataEnabled");
    return (_jsx(Box, { css: "flex-shrink 0.5;", children: _jsxs(ButtonAsLabel, { light: hasMapData, children: [_jsx(Spacing, { right: 1 }), _jsx(StyledIcon, { glyph: hasMapData ? Icon.GLYPHS.mapDataActive : Icon.GLYPHS.mapDataInactive, light: !hasMapData, dark: hasMapData, styledWidth: "20px" }), _jsx(Spacing, { right: 2 }), _jsx(Text, { semiBold: true, children: mapDataText }), _jsx(Spacing, { right: 3 })] }) }));
});
export default withControlledVisibility(MapDataCount);
//# sourceMappingURL=MapDataCount.js.map