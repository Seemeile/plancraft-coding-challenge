import * as React from 'react';
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
import {initSpaceShipModules} from './data/InitSpaceShipModules'; 

const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
`;

enum ActionType {
  Collapse = 'collapse',
  Expand = 'expand',
}

interface ReducerState {
  tree: TreeData;
}

interface ReducerAction {
  type: ActionType;
  payload: {
    itemId: ItemId; 
  };
}

const reducer: React.Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case ActionType.Collapse:
      return {tree: mutateTree(state.tree, action.payload, { isExpanded: false })};
    case ActionType.Expand:
        return {tree: mutateTree(state.tree, action.payload, { isExpanded: true })};
    default:
      throw new Error();
  }
}

const SpaceShipSelector: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, {tree: initSpaceShipModules});

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
    dispatch({type: ActionType.Expand, payload: itemId});
  };

  const onCollapse = (itemId: ItemId) => {
    dispatch({type: ActionType.Collapse, payload: itemId});
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
        tree={state.tree}
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
