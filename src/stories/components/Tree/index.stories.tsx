import React, { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tree from '../../../components/Tree';
import { TreeDataProps } from '../../../components/Tree/interface';

interface TreePropsArray {
  treeArray: Array<TreeDataProps>;
}

const TreeTest: FC<TreePropsArray> = ({ treeArray }: TreePropsArray) => {
  const maxWeightArray = treeArray?.map((v: TreeDataProps) => v?.treeWeight);
  const maxWeight = Math.max(...maxWeightArray);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {treeArray?.map((v: TreeDataProps, i: number) => (
        <Tree
          name={v?.name}
          value={v?.value}
          treeWeight={v?.treeWeight}
          maxWeight={maxWeight}
          key={`TreeTest: ${i}`}
        />
      ))}
    </div>
  );
};

export default {
  title: 'Components/Tree',
  component: TreeTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TreeTest>;

const TreeStory: ComponentStory<typeof TreeTest> = ({
  treeArray,
}: TreePropsArray) => {
  return <TreeTest treeArray={treeArray} />;
};
export const tree = TreeStory.bind({});

tree.args = {
  treeArray: [
    {
      name: 'A',
      value: 0.05,
      treeWeight: 6,
    },
    {
      name: 'b',
      value: -0.05,
      treeWeight: 4,
    },
    {
      name: 'c',
      value: 0.06,
      treeWeight: 10,
    },
    {
      name: 'd',
      value: 0.01,
      treeWeight: 5,
    },
    {
      name: 'e',
      value: -0.01,
      treeWeight: 5,
    },
  ],
};
