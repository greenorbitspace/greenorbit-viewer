import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { getName } from "../../ModelMixins/CatalogMemberMixin";
import Styles from "./feature-info-catalog-item.scss";
import FeatureInfoSection from "./FeatureInfoSection";
export default observer((props) => {
    var _a;
    const { t } = useTranslation();
    const features = props.features;
    const catalogItem = props.catalogItem;
    const terria = props.viewState.terria;
    const maximumShownFeatureInfos = (_a = catalogItem.maximumShownFeatureInfos) !== null && _a !== void 0 ? _a : terria.configParameters.defaultMaximumShownFeatureInfos;
    const hiddenNumber = features.length - maximumShownFeatureInfos; // A positive hiddenNumber => some are hidden; negative means none are.
    return (_jsx("li", { children: _jsxs("ul", { className: Styles.sections, children: [hiddenNumber === 1 ? (_jsxs("li", { className: Styles.messageItem, children: [_jsx("strong", { children: t("featureInfo.catalogItem.moreThanMax", {
                                maximum: maximumShownFeatureInfos,
                                catalogItemName: getName(catalogItem)
                            }) }), _jsx("br", {}), t("featureInfo.catalogItem.featureInfoShown", {
                            maximum: maximumShownFeatureInfos
                        })] })) : null, hiddenNumber > 1 ? (_jsxs("li", { className: Styles.messageItem, children: [_jsx("strong", { children: t("featureInfo.catalogItem.featuresFound", {
                                featCount: features.length,
                                catalogItemName: getName(catalogItem)
                            }) }), _jsx("br", {}), t("featureInfo.catalogItem.featureInfoShown", {
                            maximum: maximumShownFeatureInfos
                        })] })) : null, features.slice(0, maximumShownFeatureInfos).map((feature, i) => {
                    var _a;
                    return (_jsx(FeatureInfoSection, { catalogItem: catalogItem, feature: feature, position: (_a = terria.pickedFeatures) === null || _a === void 0 ? void 0 : _a.pickPosition, isOpen: !!(feature === terria.selectedFeature || props.printView), onClickHeader: props.onToggleOpen, printView: props.printView }, i));
                })] }) }));
});
//# sourceMappingURL=FeatureInfoCatalogItem.js.map