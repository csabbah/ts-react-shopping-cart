import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";

export const Wrapper = styled.div`
  margin: 50px;

  @media (max-width: 600px) {
    margin: 25px;
  }
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;
