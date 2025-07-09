import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider } from "styled-components";
import { ViewStateProvider } from "./ViewStateContext";
export const ContextProviders = (props) => (_jsx(ViewStateProvider, { viewState: props.viewState, children: _jsx(ThemeProvider, { theme: props.theme, children: props.children }) }));
//# sourceMappingURL=ContextProviders.js.map