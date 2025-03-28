import {
  Columns2,
  Facebook,
  Frame,
  Framer,
  Image,
  Link2,
  PanelTop,
  Projector,
  RectangleEllipsis,
  SquareSplitVertical,
  Text,
  TextSelectionIcon,
  Twitter,
} from 'lucide-react';

export default [
  {
    icon: RectangleEllipsis,
    label: 'Button',
    type: 'button',
    content: 'Sample Button',
    url: '#',
    styleClass:
      'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ',
    style: {},
    outerStyle: {},
  },
  {
    icon: TextSelectionIcon,
    type: 'Text',
    label: 'text',
    content: 'Sample Text',
    styleClass: 'text-4xl font-thin text-gray-900 dark:text-white',
    style: {},
    outerStyle: {},
  },
  {
    icon: Image,
    type: 'image',
    label: 'Image',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
    alt: 'Image',
    url: '#',
    styleClass: 'w-full h-auto max-w-lg rounded-lg',
    style: {},
    outerStyle: {},
  },
  {
    icon: Frame,
    type: 'logo',
    label: 'Logo',
    imageUrl: '/logo.svg',
    alt: 'logo',
    url: '#',
    style: {
      backgroundColor: '#ffffff',
      padding: '10px',
      height: '30%',
      width: '30%',
    },
    outerStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '100%',
    },
  },
  {
    icon: PanelTop,
    type: 'LogoHeader',
    label: 'Logo Header',
    imageUrl: '/logo.svg',
    alt: 'logo',
    url: '#',
    style: {
      backgroundColor: '#ffffff',
      padding: '10px',
      height: '40%',
      width: '40%',
    },
    outerStyle: {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '100%',
    },
  },
  {
    icon: SquareSplitVertical,
    type: 'Divider',
    label: 'Divider',
    content: '',
    style: {
      color: '#000000',
      padding: '10px',
      width: '100%',
    },
  },
  {
    type: 'SocialIcons',
    icon: Twitter,
    label: 'Social Icons',
    socialIcons: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111463.png',
        url: '',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968852.png',
        url: '',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968756.png',
        url: '',
      },
    ],
    options: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111463.png',
        url: '',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968852.png',
        url: '',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968756.png',
        url: '',
      },
    ],
    style: {
      width: 40,
      height: 40,
    },
    outerStyle: {
      display: 'flex',
      gap: 15,
    },
  },
];
