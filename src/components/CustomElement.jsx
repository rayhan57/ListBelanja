import styled from "styled-components";

export const CustomTable = styled.table`
  thead {
    background-color: #0f2c59;
    color: #f8f0e5;
  }

  tbody {
    background-color: #ffffff;
    color: #0f2c59;
  }

  th,
  td {
    padding: 8px;
  }

  tbody tr {
    border-bottom: 1px solid #0f2c59;
  }

  tbody tr:hover {
    background-color: #dac0a3;
  }
`;

export const CustomButton = styled.button`
  background-color: #0f2c59;
  color: #f8f0e5;
  padding: 6px 12px;
  border-radius: 0.375rem;
  border: none;
  &:not(:disabled):hover {
    background-color: #194381;
  }
  &:disabled {
    opacity: 0.65;
  }
`;

export const CustomButton2 = styled.button`
  background-color: #dac0a3;
  color: #0f2c59;
  padding: 6px 12px;
  border-radius: 0.375rem;
  border: none;
  &:hover {
    background-color: #b69e83;
  }
`;
