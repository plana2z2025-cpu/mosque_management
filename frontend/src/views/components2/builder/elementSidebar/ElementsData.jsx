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
    type: 'Button',
    content: 'Sample Button',
    url: '#',
    styleClass:
      'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ',
    style: {},
    outerStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  },
  {
    icon: TextSelectionIcon,
    type: 'Text',
    label: 'Text',
    content: 'Sample Text',
    styleClass: 'text-4xl font-thin text-gray-900 dark:text-white',
    style: {},
    outerStyle: {
      backgroundColor: '#fff',
      width: '100%',
    },
  },
  {
    icon: Image,
    type: 'Image',
    label: 'Image',
    imageUrl: '/image.png',
    alt: 'Image',
    url: '#',
    style: {
      backgroundColor: '#ffffff',
      padding: '10px',
      height: '50%',
      width: '70%',
      margin: '0px',
      borderRadius: '0px',
    },
    outerStyle: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
  },
  {
    icon: Frame,
    type: 'Logo',
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
