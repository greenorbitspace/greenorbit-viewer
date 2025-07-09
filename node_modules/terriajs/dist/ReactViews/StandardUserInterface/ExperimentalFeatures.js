import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import { withViewState } from "../Context";
const ControlsWrapper = styled.div `
  position: absolute;
  left: 25px;
  bottom: 25px;
  z-index: 1;
  @media (min-width: ${(props) => props.theme.sm}px) {
    top: auto;
    bottom: 100px;
  }
`;
const Control = styled.div `
  margin: 15px 0;
  text-align: center;
  &:last-child {
    margin-bottom: 0;
  }
`;
const ExperimentalFeatures = (props) => {
    return (_jsx(ControlsWrapper, { children: (props.experimentalItems || []).map((item, i) => (_jsx(Control, { children: item }, i))) }));
};
export default withViewState(ExperimentalFeatures);
//# sourceMappingURL=ExperimentalFeatures.js.map