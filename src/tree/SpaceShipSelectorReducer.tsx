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

const addToTree = (state: ReducerState) => {
    state.tree.items.newItem = {
        id: 'newItem',
        children: [],
        data: {
            title: 'newItem',
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
            addToTree(state);
            const underItem: ItemId = action.payload;
            return {tree: mutateTree(state.tree, action.payload, { 
                children: [...state.tree.items[underItem].children, 'newItem'] 
            })};
        default:
        throw new Error();
    }
}
