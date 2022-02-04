import styled from 'styled-components';

export const MainDiv = styled.div`
  display: grid;
  grid-template-columns: auto 4fr 300px;
  gap: 30px;
  margin-top: 50px;
`;

export const GalleryImg = styled.img`
  max-width: 100px;
  width: 100%;
  max-height: 100px;
  object-fit: cover;
  cursor: pointer;
`;

export const MainImg = styled.div`
  min-height: 600px;
  margin-right: 40px;
  background-image: url(${(p) => p.src});
  background-size: contain;
  background-repeat: no-repeat;
`;
