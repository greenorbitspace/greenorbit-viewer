import { jsx as _jsx } from "react/jsx-runtime";
import PropTypes from "prop-types";
import { useRefForTerria } from "../Hooks/useRefForTerria";
/*
    HOC to set a ref and store it in viewState
*/
export const withTerriaRef = (WrappedComponent, refName) => {
    const WithTerriaRef = (props) => {
        const hocRef = useRefForTerria(refName, props.viewState);
        return _jsx(WrappedComponent, { refFromHOC: hocRef, ...props });
    };
    WithTerriaRef.propTypes = {
        viewState: PropTypes.object.isRequired
    };
    return WithTerriaRef;
};
export default withTerriaRef;
//# sourceMappingURL=withTerriaRef.js.map