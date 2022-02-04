import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(p) => p.gap * 5}px;
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.flexDirection};
  margin-top: ${(p) => p.mt * 5}px;
  margin-bottom: ${(p) => p.mb * 5}px;
  margin-left: ${(p) => p.ml * 5}px;
  margin-right: ${(p) => p.mr * 5}px;
  position: ${(p) => p.position};
`;

Flex.defaultProps = {
  gap: 0,
  mt: 0,
  mb: 0,
  ml: 0,
  mr: 0,
  alignItems: 'initial',
  justifyContent: 'initial',
  flexDirection: 'initial',
  position: 'initial'
};

export const Flex1 = styled.div`
  flex: 1;
`;

export const PushRight = ({ ...props }) => (
  <Flex justifyContent="flex-end" {...props} />
);

export const Center = ({ ...props }) => (
  <Flex alignItems="center" justifyContent="center" {...props} />
);

export const FHCenter = ({ style = {}, ...props }) =>
  Center({ ...props, style: { ...style, height: '100%' } });

export const Column = ({ ...props }) => (
  <Flex flexDirection="column" {...props} />
);

export const Relative = styled.div`
  position: relative;
`;

export const Div2Children = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.gap * 5}px;
`;

Div2Children.defaultProps = {
  gap: 0
};

export const Btn1 = styled.button`
  background: white;
  padding: 14px;
  font-size: 16px;
  color: #1d1f22;
  border-color: #1d1f22;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #1d1f22;
    color: white;
  }
`;

export const Btn2 = styled.button`
  background: white;
  padding: 14px;
  font-size: 16px;
  background: ${(p) => (!p.disabled ? 'var(--green)' : 'gray!important')};
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--darkgreen);
  }
`;

const MainDivSC = styled.div`
  margin-top: 25px !important;
`;

export const MainDivContainer = ({ ...props }) => (
  <MainDivSC {...props} className="myContainer" />
);
