import styled from 'styled-components';

const btnDisabled = '#989898';
const btnDisabledBg = '#dddddd';

export const MainDiv = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  top: 0;
  border-bottom: 1px solid #ededed;
  z-index: 5;
`;

export const NavUlSC = styled.div`
  display: flex;
  gap: 4px;
`;

export const NavLiSC = styled.div`
  padding: 25px 20px;
  text-transform: uppercase;
  color: ${(p) => (p.active ? 'var(--green)' : 'black')};
  border-bottom: ${(p) => (p.active ? '1px solid' : 'none')};
`;

export const Logo = styled.img`
  height: 30px;
  max-width: 60px;
`;

export const VerticalCenter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CurrentcySC = styled.p`
  font-size: 18px;
`;

export const ExpandSC = styled.img`
  height: 20px;
  max-width: 40px;
`;
export const CartSC = styled.img`
  height: 25px;
  max-width: 40px;
`;

export const CartDivSC = styled.div`
  position: relative;
`;

export const CartItemsLengthSC = styled.div`
  position: absolute;
  top: -7px;
  right: -9px;
  height: 19px;
  width: 20px;
  background: black;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  color: white;
  font-size: 11px;
`;

export const MiniCartSC = styled.div`
  position: absolute;
  top: 99%;
  right: 0;
  padding: 15px;
  width: 350px;
  box-shadow: 0 4px 2px #0000000d;
  border-radius: 2px;
  z-index: 3;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const MiniCartBG = styled.div`
  position: fixed;
  top: 69px;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${(p) => p.bg};
  animation: fadeIn 0.1s linear forwards;
  z-index: 2;
`;

MiniCartBG.defaultProps = {
  bg: '#0000003d'
};

export const MiniCartItemsLengthSC = styled.p`
  font-size: 14px;
`;

export const MiniCartItemsGridSC = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 5px;
`;

export const MiniCartItemsSpecHeaderSC = styled.p`
  font-size: 20px;
  color: #1c1c1c;
  font-weight: 200;
`;

export const MiniCartItemsSpecSizesSC = styled.div`
  height: ${(p) => p.height};
  min-width: ${(p) => p.width};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(p) => p.borderWidth}px solid
    ${(p) => (p.disabled ? btnDisabled : p.border)};
  color: ${(p) => (p.disabled ? btnDisabled : 'black')};
  background: ${(p) => (p.disabled ? btnDisabledBg : p.bg)};
  cursor: pointer;
  transition: 0.3s;
  font-weight: ${(p) => (p.weight ? 'bold' : 'inherit')};

  ${(p) => p.selected && `background: black; color: white;`}
  ${(p) =>
    !p.disableHover &&
    `
  &:hover {
    background: ${p.disabled ? 'initial' : p.disableHover ? p.bg : 'black'};
    color: ${p.disabled ? 'initial' : p.disableHover ? p.bg : 'white'};
  }
  `}
`;

MiniCartItemsSpecSizesSC.defaultProps = {
  height: '30px',
  width: '30px',
  bg: 'white',
  disableHover: false,
  weight: false,
  borderWidth: 1,
  selected: false,
  border: 'black'
};

export const BigSpecSizeSC = ({ ...props }) => (
  <MiniCartItemsSpecSizesSC
    {...props}
    width={'60px'}
    height={'40px'}
    weight={true}
    borderWidth={2}
  />
);

export const MiniCartItemsSpecImgSC = styled.div`
  width: 100%;
  min-height: 140px;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-color: white;
  background-repeat: no-repeat;
  background-image: url(${(p) => p.image});
`;

export const MiniCartItemsDeleteIconSC = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const CurrenciesDivSC = styled.div`
  position: absolute;
  top: 82%;
  right: 0;
  padding: 15px;
  box-shadow: 0 0 2px #00000017;
  border-radius: 2px;
  z-index: 3;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > p {
    cursor: pointer;
  }
`;

export const CurrencyP = styled.div`
  color: ${(p) => (p.active ? 'var(--green)' : 'black')};
  cursor: pointer;
`;

export const CartItemsParentSC = styled.div`
  max-height: 432px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;
