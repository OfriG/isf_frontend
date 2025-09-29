'use client';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../logo';

export default function HeaderDesktop({ links = [] }) {
  return (
    <div className="header_container_desktop">
      <div className="container">
        <div className="header_logo">
          <Logo width={139.469} height={106.075} />
        </div>
        <div className="header_nav">
          {links.map((link, i) => (
            <Link
              key={link.id}
              href={link.url}
              className={i === links.length - 1 ? 'highlighted' : ''}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
