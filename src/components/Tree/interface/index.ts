export const defaultProps = {
  name: '',
  value: 0,
  treeWeight: 0,
  maxWeight: 0,
};

export interface TreeStyle {
  backgroundColor: 'red' | 'green';
  width: string;
  border: string;
  height: '100px';
  display: 'flex';
  justifyContent: 'center';
  alignItems: 'center';
}

export interface TreeContainerStyle {
  display: 'flex';
  flexDirection: 'column';
  textAlign: 'center';
}

export type TreeProps = {
  name: string;
  value: number;
  treeWeight: number;
  maxWeight: number;
} & typeof defaultProps;

export type TreeDataProps = Omit<TreeProps, 'maxWeight'>;

export type TreeStyleProps = Pick<
  TreeProps,
  'value' | 'treeWeight' | 'maxWeight'
>;
