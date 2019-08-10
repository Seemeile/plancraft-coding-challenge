import {TreeData} from '@atlaskit/tree';

export const initSpaceShipModules: TreeData = {
    rootId: 'root',
    items: {
      'root': {
        id: 'root',
        children: ['ship modules'],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'spaceship',
          isDragable: false
        }
      },
      'ship modules': {
        id: 'ship modules',
        children: ['weapons', 'engines'],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'ship modules',
          isDragable: false
        }
      },
      'weapons': {
        id: 'weapons',
        children: ['energy', 'bombs'],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'weapons',
          isDragable: false
        }
      },
      'energy': {
        id: 'energy',
        children: ['spreadgun', 'lasergun'],
        hasChildren: false,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'energy',
          isDragable: true
        },
      },
      'spreadgun': {
        id: 'spreadgun',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'spreadgun',
          isDragable: true
        }
      },
      'lasergun': {
        id: 'lasergun',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'lasergun',
          isDragable: true
        }
      },
      'bombs': {
        id: 'bombs',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'bombs',
          isDragable: true
        }
      },
      'engines': {
        id: 'engines',
        children: ['thrusters', 'warp engine'],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          title: 'engines',
          isDragable: false
        },
      },
      'thrusters': {
        id: 'thrusters',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'thrusters',
          isDragable: true
        },
      },
      'warp engine': {
        id: 'warp engine',
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          title: 'warp engine',
          isDragable: true
        },
      },
    },
  };
