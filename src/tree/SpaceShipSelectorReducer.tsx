import {
    mutateTree,
    moveItemOnTree,
    TreeData,
    ItemId,
    TreeSourcePosition,
    TreeDestinationPosition,
  } from '@atlaskit/tree';

export enum ActionType {
    Collapse = 'collapse',
    Expand = 'expand',
    Drag = 'drag'
}

export interface ReducerState {
    tree: TreeData;
}

export interface ReducerAction {
    type: ActionType;
    payload: {
        itemId: ItemId;
        src: TreeSourcePosition;
        dst: TreeDestinationPosition;
    };
}

export const reducer: React.Reducer<ReducerState, ReducerAction> = (state, action) => {
    switch (action.type) {
        case ActionType.Collapse:
        return {tree: mutateTree(state.tree, action.payload, { isExpanded: false })};
        case ActionType.Expand:
            return {tree: mutateTree(state.tree, action.payload, { isExpanded: true })};
        case ActionType.Drag:
            return {tree: moveItemOnTree(state.tree, action.payload.src, action.payload.dst)};
        default:
        throw new Error();
    }
}
