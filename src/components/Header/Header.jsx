'use client';
import './Header.scss';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

export default function Header({ links = [] }) {
  return (
    <header className="header">
      <HeaderMobile links={links} />
      <HeaderDesktop links={links} />
    </header>
  );
}
