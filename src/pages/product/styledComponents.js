import styled from 'styled-components';

export const ProductNameSC = styled.h1`
  font-size: 30px;
  font-weight: 400;
`;

export const AttrNameSC = styled.h4`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: ${(p) => p.mb * 5}px;
`;

AttrNameSC.defaultProps = {
  mb: 0
};

export const PriceSC = styled.h4`
  font-weight: 700;
  font-size: 24px;
`;

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

export const DescriptionSC = styled.div`
  font-weight: 400;
`;
