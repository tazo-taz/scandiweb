import styled from 'styled-components';

export const MainDiv = styled.div`
  margin-top: 25px !important;
`;

export const ItemsParent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 55px;
  margin-top: 30px;
`;

export const CategoryNameSC = styled.h1`
  font-size: 42px;
  font-weight: 400;
  text-transform: capitalize;
`;
