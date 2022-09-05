import { FC } from 'react';
import PropTypes from 'prop-types';
import { defaultProps, TreeProps } from './interface';
import treeStyles from './styles';

const { treeStyle, treeContainerStyle } = treeStyles;

const Tree: FC<TreeProps> = ({
  name,
  value,
  treeWeight,
  maxWeight,
  ...props
}: TreeProps) => {
  return (
    <div style={treeStyle({ value, treeWeight, maxWeight })} {...props}>
      <div style={treeContainerStyle}>
        <div>{name}</div>
        <div>{`${Math.round(value * 10000) / 100}%`}</div>
      </div>
    </div>
  );
};

export default Tree;

Tree.propTypes = {
  name: PropTypes.oneOfType<any>([
    PropTypes.string,
    PropTypes.oneOf([undefined, null]),
  ]),
  value: PropTypes.oneOfType<any>([
    PropTypes.number,
    PropTypes.oneOf([undefined, null]),
  ]),
  treeWeight: PropTypes.oneOfType<any>([
    PropTypes.number,
    PropTypes.oneOf([undefined, null]),
  ]),
  maxWeight: PropTypes.oneOfType<any>([
    PropTypes.number,
    PropTypes.oneOf([undefined, null]),
  ]),
};

Tree.defaultProps = defaultProps;
