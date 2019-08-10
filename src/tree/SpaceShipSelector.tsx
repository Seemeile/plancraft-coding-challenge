///<reference path="./SpaceShipSelectorTypes.d.ts"/>
import * as React from 'react';
import './SpaceShipSelector.css';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import Button from '@atlaskit/button';
import Container from '@atlaskit/navigation';
import Tree, {
  RenderItemParams,
  TreeItem,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from '@atlaskit/tree';
import {initSpaceShipModules} from './data/InitSpaceShipModules'; 
import {ActionType, reducer} from './SpaceShipSelectorReducer';

const SpaceShipSelector: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, {tree: initSpaceShipModules});

  const getIcon = (item: TreeItem, onExpand: (itemId: ItemId) => void, onCollapse: (itemId: ItemId) => void) => {
    if (item.children && item.children.length > 0) {
      return item.isExpanded ? (
        <Button spacing="none" appearance="subtle-link" onClick={() => onCollapse(item.id)}>
          <ChevronDownIcon label="" size="medium" />
        </Button>
      ) : (
        <Button spacing="none" appearance="subtle-link" onClick={() => onExpand(item.id)}>
          <ChevronRightIcon label="" size="medium" />
        </Button>
      );
    }
    return <div className="PreTextIcon">&bull;</div>;
  };

  const addItem = () => {
    const underItem: ItemId = 'engines';
    dispatch({type: ActionType.Add, payload: underItem})
  }

  const onExpand = (itemId: ItemId) => {
    dispatch({type: ActionType.Expand, payload: itemId});
  };

  const onCollapse = (itemId: ItemId) => {
    dispatch({type: ActionType.Collapse, payload: itemId});
  };

  const onDragEnd = (source: TreeSourcePosition, destination: TreeDestinationPosition | undefined) => {
    if (!destination) {
      //alert('no destination');
    } else {
      const curItem: ItemId = state.tree.items[source.parentId].children[source.index];
      const dragAllowed: boolean = state.tree.items[curItem].data.isDragable;
      if (dragAllowed) {
        dispatch({type: ActionType.Drag, payload: {itemId: undefined, src: source, dst: destination}});
      }
    }
  };

  const renderItem = ({item, onExpand, onCollapse, provided, snapshot}: RenderItemParams) => {
    return (
      <div className="Item"
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
      <Button spacing="compact" appearance="primary" onClick={addItem}>
          create item
      </Button>
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
