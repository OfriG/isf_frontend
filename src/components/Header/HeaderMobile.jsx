'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../logo';
export default function HeaderMobile({ links = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="header_container-mobile">
      <div className="container">
        <div className="header_logo">
          <Logo width={52.309} height={40.671} />
        </div>
        <div className={`header_nav ${isMenuOpen ? 'none' : ''}`}>
          <button
            className="menu-icon"
            onClick={toggleMenu}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <Image
              src="/toogle.svg"
              alt="menu"
              width={24}
              height={24}
            />
          </button>
          <button
            className="close-icon"
            onClick={closeMenu}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <Image
              src="/x.svg"
              alt="close"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className={`header_nav_links ${isMenuOpen ? 'active' : ''}`}>
        <div className="left-div">
          <Logo width={52.309} height={40.671} />
        </div>
        <div className="right-div">
          <Image
            src="/x.svg"
            alt="close"
            width={20.757}
            height={20.383}
            onClick={closeMenu}
            className="close-icon"
          />
          {links.map((link, i) => (
            <Link
              key={link.id}
              href={link.url}
              className={i === links.length - 1 ? 'highlighted' : ''}
              onClick={closeMenu}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
