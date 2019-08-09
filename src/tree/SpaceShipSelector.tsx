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
  Drag = 'drag'
}

interface ReducerState {
  tree: TreeData;
}

interface ReducerAction {
  type: ActionType;
  payload: {
    itemId: ItemId;
    src: TreeSourcePosition;
    dst: TreeDestinationPosition;
  };
}

const reducer: React.Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case ActionType.Collapse:
      console.log(action.payload);
      return {tree: mutateTree(state.tree, action.payload, { isExpanded: false })};
    case ActionType.Expand:
        return {tree: mutateTree(state.tree, action.payload, { isExpanded: true })};
    case ActionType.Drag:
        return {tree: moveItemOnTree(state.tree, action.payload.src, action.payload.dst)};
    default:
      throw new Error();
  }
}

const SpaceShipSelector: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, {tree: initSpaceShipModules});

  const getIcon = (item: TreeItem, onExpand: (itemId: ItemId) => void, onCollapse: (itemId: ItemId) => void) => {
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

  const onDragEnd = (source: TreeSourcePosition, destination: TreeDestinationPosition | undefined) => {
    if (!destination) {
      alert('no destination');
    } else {
      dispatch({type: ActionType.Drag, payload: {itemId: undefined, src: source, dst: destination}});
    }
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
        isDragEnabled={true}
        isNestingEnabled={true}
      />
    </div>
  );
}

export default SpaceShipSelector;
