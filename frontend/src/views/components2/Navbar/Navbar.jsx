import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const menuItems = [
  { id: 'home', label: 'Home', href: '/', current: true },
  {
    id: 'about-us',
    label: 'About',
    href: '/about',
  },
  {
    id: 'login',
    label: 'Login',
    href: '/login',
  },
  {
    id: 'mosque-registration-form',
    label: 'Registration',
    href: '/register-mosque',
  },
  {
    id: 'programs',
    label: 'Programs',
    children: [
      { id: 'dars', label: 'Dars', href: '#' },
      { id: 'ijtima', label: 'Ijtima', href: '#' },
    ],
  },
  {
    id: 'profile',
    label: 'Profile',
    children: [
      { id: 'your-profile', label: 'Your Profile', href: '#' },
      { id: 'settings', label: 'Settings', href: '#' },
      { id: 'sign-out', label: 'Sign out', href: '#' },
    ],
  },
];

const RenderMenuItem = ({ item, isMobile = false, openDropdown, toggleDropdown, index }) => {
  const baseClasses = isMobile
    ? 'block rounded-md px-3 py-2 text-base font-medium'
    : 'px-3 py-2 text-sm  border-l-2 border-gray-500';
  const activeClasses = item.current
    ? 'text-green-400 font-semibold'
    : // : "text-black hover:bg-gray-700 hover:text-white  ";
      'text-black hover:text-green-400 hover:font-semibold';

  if (item?.children) {
    return (
      <div key={item.id} className="relative navItems">
        <button
          onClick={() => toggleDropdown(item.id)}
          onMouseEnter={() => toggleDropdown(item.id)}
          className={`${baseClasses} ${activeClasses} `}
        >
          {item.label}
        </button>
        {openDropdown === item.id && (
          <div
            className="absolute right-0 z-20 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            onMouseLeave={() => toggleDropdown(null)}
          >
            {item.children.map((subItem) => (
              <Link
                key={subItem.id}
                to={subItem.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      key={item.id}
      to={item.href}
      className={`navItems ${baseClasses} ${activeClasses} transition-colors duration-300 ${
        index === 0 ? 'border-none' : ''
      } `}
      // aria-current={item.current ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
};

const Navbar = () => {
  useGSAP(() => {
    gsap.from('.navItems', {
      y: -200,
      opacity: 0,
      duration: 1.5,
      stagger: 0.5,
    });
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = (id) => setOpenDropdown(openDropdown === id ? null : id);

  return (
    <nav
      className="font-poppins"
      id="mainNavbar"
      // style={{
      //   backgroundImage:
      //     'url("https://www.masjidramadan.org/images/slider/banner-masjid.jpg")',
      // }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src="" alt="" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {menuItems.map((item, index) => (
                  <RenderMenuItem
                    item={item}
                    openDropdown={openDropdown}
                    toggleDropdown={toggleDropdown}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {menuItems.map((item) => (
            <RenderMenuItem
              item={item}
              isMobile={true}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
