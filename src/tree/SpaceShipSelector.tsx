///<reference path="./SpaceShipSelector.d.ts" />
import React from 'react';
import './SpaceShipSelector.css';
import styled from 'styled-components';
import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from '@atlaskit/tree';

const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
`;

const SpaceShipSelector: React.FC = () => {
  const treeWithTwoBranches: TreeData = {
    rootId: '1',
    items: {
      '1': {
        id: '1',
        children: ['1-1', '1-2'],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'root',
        },
      },
      '1-1': {
        id: '1-1',
        children: ['1-1-1', '1-1-2'],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'First parent',
        },
      },
      '1-2': {
        id: '1-2',
        children: ['1-2-1', '1-2-2'],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'Second parent',
        },
      },
      '1-1-1': {
        id: '1-1-1',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'Child one',
        },
      },
      '1-1-2': {
        id: '1-1-2',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'Child two',
        },
      },
      '1-2-1': {
        id: '1-2-1',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'Child three',
        },
      },
      '1-2-2': {
        id: '1-2-2',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'Child four',
        },
      },
    },
  };

  const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void,
  ) => {
    if (item.children && item.children.length > 0) {
      return item.isExpanded ? (
        <PreTextIcon onClick={() => onCollapse(item.id)}>-</PreTextIcon>
      ) : (
        <PreTextIcon onClick={() => onExpand(item.id)}>+</PreTextIcon>
      );
    }
    return <PreTextIcon>&bull;</PreTextIcon>;
  };

  const onExpand = (itemId: ItemId) => {
    
  };

  const onCollapse = (itemId: ItemId) => {
    
  };

  const onDragEnd = (source: TreeSourcePosition | undefined, destination: TreeDestinationPosition | undefined) => {
    
  };

  const renderItem = ({item, onExpand, onCollapse, provided, snapshot}: RenderItemParams) => {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <span>{getIcon(item, onExpand, onCollapse)}</span>
        <span>{item.data ? item.data.title : ''}</span>
      </div>
    );
  };

  return (
    <div className="SpaceShipSelector">
      <Tree
        tree={treeWithTwoBranches}
        renderItem={renderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        isDragEnabled
      />
    </div>
  );
}

export default SpaceShipSelector;
