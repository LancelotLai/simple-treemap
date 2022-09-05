import { TreeContainerStyle, TreeStyleProps, TreeStyle } from '../interface';

export const treeStyle = ({
  value,
  treeWeight,
  maxWeight,
}: TreeStyleProps): TreeStyle => {
  const width = `calc(${(treeWeight / maxWeight) * 100 || 0}% ${
    treeWeight / maxWeight !== 1 ? '- 2px' : ''
  })`;
  return {
    width: width,
    backgroundColor: value > 0 ? 'green' : 'red',
    height: '100px',
    border: '1px black solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

export const treeContainerStyle: TreeContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

const treeStyles = {
  treeStyle,
  treeContainerStyle,
};

export default treeStyles;
