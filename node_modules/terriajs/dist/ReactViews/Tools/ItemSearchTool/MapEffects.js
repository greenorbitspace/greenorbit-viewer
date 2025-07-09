import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
/**
 * A component that applies some effect on the map.
 *
 */
const MapEffects = ({ item, results, effect }) => {
    switch (effect.is) {
        case "highlightAll":
            return _jsx(HighlightResults, { item: item, results: results });
        case "highlightSingleResult":
            return _jsx(HighlightResults, { item: item, results: effect.result });
        case "showMatchingOnly":
            return _jsx(HideAllResults, { item: item, results: results });
        case "none":
            return null;
    }
};
export default MapEffects;
export const HideAllResults = (props) => {
    const { item, results } = props;
    useEffect(() => {
        const disposer = item.hideFeaturesNotInItemSearchResults(results);
        return disposer;
    }, [item, results]);
    return null;
};
export const HighlightResults = (props) => {
    useEffect(() => {
        const item = props.item;
        const results = Array.isArray(props.results)
            ? props.results
            : [props.results];
        if (results.length === 1)
            zoomToResult(item, results[0]);
        const disposer = item.highlightFeaturesFromItemSearchResults(results);
        return disposer;
    }, [props.item, props.results]);
    return null;
};
function zoomToResult(item, result) {
    item.zoomToItemSearchResult(result);
}
//# sourceMappingURL=MapEffects.js.map