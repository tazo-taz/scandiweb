import styled from 'styled-components';

export const MainDiv = styled.div`
  margin-top: 50px;
`;

export const CartItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 160px;
  gap: 10px;
  border-top: 1px solid #ededed;
  padding: 20px 0;
`;

export const CartItemImg = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: contain;
`;

export const CartItemIcon = styled.img`
  position: absolute;
  top: 50%;
  left: ${(p) => p.left};
  right: ${(p) => p.right};
  transform: translateY(-50%) scale(0.7);
  cursor: pointer;
  z-index: 1;
`;

CartItemIcon.defaultProps = {
  right: 'initial',
  left: 'initial'
};
