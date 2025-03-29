import { Columns2, Columns3, Columns4, RectangleHorizontal } from 'lucide-react';

export default [
  {
    label: 'Column',
    type: 'column',
    numOfColumns: 1,
    icon: RectangleHorizontal,
    json: {
      type: 'column',
      styles: {
        background: '#9c27b0',
      },
      columns: 1,
      block: [
        {
          index: 0,
          subBlock: [],
        },
      ],
    },
  },
  {
    label: '2 Column',
    type: 'column',
    numOfColumns: 2,
    icon: Columns2,
    json: {
      type: 'column',
      styleClass: 'flex',
      styles: {},
      columns: 2,
      block: [
        { index: 0, subBlock: [] },
        { index: 1, subBlock: [] },
      ],
    },
  },
  {
    label: '3 Column',
    type: 'column',
    numOfColumns: 3,
    icon: Columns3,
    json: {
      type: 'column',
      styles: {},
      columns: 3,
      block: [
        { index: 0, subBlock: [] },
        { index: 1, subBlock: [] },
        { index: 2, subBlock: [] },
      ],
    },
  },
  {
    label: '4 Column',
    type: 'column',
    numOfColumns: 4,
    icon: Columns4,
    json: {
      type: 'column',
      styles: {},
      columns: 4,
      block: [
        { index: 0, subBlock: [] },
        { index: 1, subBlock: [] },
        { index: 2, subBlock: [] },
        { index: 3, subBlock: [] },
      ],
    },
  },
];
