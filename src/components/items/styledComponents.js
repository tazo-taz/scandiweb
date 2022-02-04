import styled from 'styled-components';
const disabledColor = 'gray';

export const MainItem = styled.div`
  position: relative;

  &:hover .addIcon {
    opacity: 1;
  }
`;

export const ItemParent = styled.div`
  display: grid;
  grid-template-rows: 270px;
  gap: 20px;
  padding: 20px;
  border-radius: 2px;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 5px #0000001f;
  }
`;

export const ItemImg = styled.img`
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
`;

export const NotInStockSC = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0000000f;
  color: #878787;
  font-size: 22px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ItemNameSC = styled.p`
  color: ${(p) => (p.disabled ? disabledColor : 'black')};
  font-size: 18px;
`;

export const ItemPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${(p) => (p.disabled ? disabledColor : 'black')};
`;

export const AddIcon = styled.div`
  position: absolute;
  height: 37px;
  width: 37px;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  top: 270px;
  right: 65px;
  cursor: pointer;
  opacity: 0;
  transition: 0.3s;

  & > img {
    width: 18px;
  }
`;

export const InCart = styled.div`
  position: absolute;
  height: 37px;
  width: 37px;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  top: 270px;
  right: 20px;
  cursor: pointer;
  transition: 0.3s;
  background: var(--green);
  border-color: var(--green);
`;

export const InCartImg = styled.img`
  height: 27px;
`;
