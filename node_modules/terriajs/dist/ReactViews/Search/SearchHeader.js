import { jsx as _jsx } from "react/jsx-runtime";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { applyTranslationIfExists } from "../../Language/languageHelpers";
import { BoxSpan } from "../../Styled/Box";
import Text from "../../Styled/Text";
import Loader from "../Loader";
const SearchHeader = observer((props) => {
    const { i18n } = useTranslation();
    if (props.searchResults.isSearching || props.isWaitingForSearchToStart) {
        return (_jsx("div", { children: _jsx(Loader, { boxProps: { padded: true } }) }, "loader"));
    }
    else if (props.searchResults.message) {
        return (_jsx(BoxSpan, { paddedRatio: 2, children: _jsx(Text, { children: applyTranslationIfExists(props.searchResults.message.content, i18n, props.searchResults.message.params) }, "message") }));
    }
    else {
        return null;
    }
});
export default SearchHeader;
//# sourceMappingURL=SearchHeader.js.map