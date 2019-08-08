///<reference path="./SpaceShipSelector.d.ts" />
import React from 'react';
import './SpaceShipSelector.css';
import styled from 'styled-components';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import Button from '@atlaskit/button';
import Navigation, { AkNavigationItem } from '@atlaskit/navigation';
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

const Container = styled.div`
  display: flex;
`;

const Dot = styled.span`
  display: flex;
  width: 24px;
  height: 32px;
  justify-content: center;
  font-size: 12px;
  line-height: 32px;
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

  const getIcon = (item: TreeItem, onExpand: (itemId: ItemId) => void, onCollapse: (itemId: ItemId) => void) => {
    if (item.children && item.children.length > 0) {
      return item.isExpanded ? (
        <Button
          spacing="none"
          appearance="subtle-link"
          onClick={() => onCollapse(item.id)}
        >
          <ChevronDownIcon label="" size="medium" />
        </Button>
      ) : (
        <Button
          spacing="none"
          appearance="subtle-link"
          onClick={() => onExpand(item.id)}
        >
          <ChevronRightIcon label="" size="medium" />
        </Button>
      );
    }
    return <Dot>&bull;</Dot>;
  }

  const onExpand = (itemId: ItemId) => {
    
  };

  const onCollapse = (itemId: ItemId) => {
    
  };

  const onDragEnd = (source: TreeSourcePosition | undefined, destination: TreeDestinationPosition | undefined) => {

  };

  const renderItem = ({item, onExpand, onCollapse, provided, snapshot}: RenderItemParams) => {
    return (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <AkNavigationItem
          isDragging={snapshot.isDragging}
          text={item.data ? item.data.title : ''}
          icon={getIcon(item, onExpand, onCollapse)}
          dnd={{ dragHandleProps: provided.dragHandleProps }}
        />
      </div>
    );
  };

  return (
    <div className="SpaceShipSelector">
      <Container>
        <Navigation>
          <Tree
            tree={treeWithTwoBranches}
            renderItem={renderItem}
            onExpand={onExpand}
            onCollapse={onCollapse}
            onDragEnd={onDragEnd}
            isDragEnabled
          />
        </Navigation>
      </Container>
    </div>
  );
}

export default SpaceShipSelector;
