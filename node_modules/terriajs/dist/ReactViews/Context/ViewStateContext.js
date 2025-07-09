import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import TerriaError from "../../Core/TerriaError";
export const ViewStateContext = createContext(undefined);
export const ViewStateProvider = ({ viewState, children }) => (_jsx(ViewStateContext.Provider, { value: viewState, children: children }));
export const useViewState = () => {
    const viewState = useContext(ViewStateContext);
    if (!viewState)
        throw new TerriaError({ message: "ViewState is not defined!" });
    return viewState;
};
export const withViewState = (Component) => function withViewState(props) {
    return (_jsx(ViewStateContext.Consumer, { children: (viewState) => {
            if (!viewState)
                throw new TerriaError({ message: "ViewState is not defined!" });
            return _jsx(Component, { ...props, viewState: viewState });
        } }));
};
//# sourceMappingURL=ViewStateContext.js.map