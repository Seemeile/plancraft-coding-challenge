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
    Drag = 'drag',
    Add = 'add'
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

const addToTree = (tree: TreeData, itemId: ItemId) => {
    tree.items[itemId] = {
        id: itemId,
        children: [],
        data: {
            title: itemId,
            isDragable: true
        }
    }
};

export const reducer: React.Reducer<ReducerState, ReducerAction> = (state, action) => {
    switch (action.type) {
        case ActionType.Collapse:
        return {tree: mutateTree(state.tree, action.payload, { isExpanded: false })};
        case ActionType.Expand:
            return {tree: mutateTree(state.tree, action.payload, { isExpanded: true })};
        case ActionType.Drag:
            return {tree: moveItemOnTree(state.tree, action.payload.src, action.payload.dst)};
        case ActionType.Add:
            const underItem: ItemId = state.tree.items[
                Object.keys(state.tree.items)[Object.keys(state.tree.items).length - 1]].id;
            addToTree(state.tree, action.payload);
            return {tree: mutateTree(state.tree, underItem, { 
                children: [...state.tree.items[underItem].children, action.payload] 
            })};
        default:
        throw new Error();
    }
}
