import styled from "styled-components";

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;

  width: 350px;
  padding: 5px 20px;

  @media (max-width: 600px) {
    width: 270px;

    p {
      font-size: 16px;
    }
  }
`;
