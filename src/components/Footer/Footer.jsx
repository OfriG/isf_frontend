'use client';

import NewsLetter from "../NewsLetter/NewsLetter";
import './Footer.scss';
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";

async function getFooterData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/footer?populate[logo][populate]=*&populate[power_logo][populate]=*`,
    { cache: "no-store" }
  );
  const data = await response.json();
  return data.data;
}

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    getFooterData().then(setFooterData);
  }, []);

  useEffect(() => {
    // Initialize stars manually after component mounts
    const initStars = () => {
      if (typeof window !== 'undefined' && window.StarsBackground) {
        const starsContainer = document.querySelector('.stars-container');
        if (starsContainer) {
          new window.StarsBackground(starsContainer);
        }
      }
    };

    // Try to initialize immediately
    initStars();

    // Also try after a short delay in case the script loads later
    const timeoutId = setTimeout(initStars, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Script 
        src="/resources/js/starsBackground.js" 
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize stars when script loads
          const starsContainer = document.querySelector('.stars-container');
          if (starsContainer && window.StarsBackground) {
            new window.StarsBackground(starsContainer);
          }
        }}
      />
      <footer>
        <div className="stars-container"></div>
        <div className="container">
          <div className="footer-content">
            <div className="footer_logo">
              <div className="logo-container">
                {footerData.logo?.map((logoItem) => (
                  <Image
                    key={logoItem.id}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logoItem.logo.url}`}
                    width={52.309}
                    height={40.671}
                    alt={logoItem.logo.alternativeText || 'Logo'}
                  />
                ))}
              </div>
              
              <div className="powered-by">
                <span>{footerData.power_logo?.text}</span>
                {footerData.power_logo?.logo && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${footerData.power_logo.logo.url}`}
                    alt={footerData.power_logo.logo.alternativeText || 'Logo'}
                  />
                )}
              </div>
            </div>
            <NewsLetter />
            <div className="newsletter_menu">
            <div className="newsletter_left_menu">
                <ul>
                    {footerData.left_menu?.map((item) => (
                        <li key={item.id}>
                            <a href={`/${item.url}`}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>


            <div>
                <ul>
                    {footerData.right_menu?.map((item) => (
                        <li key={item.id}>
                            <a href={`/${item.url}`}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
          </div>
          
          <div className="footer-bottom">
            <div className="copyright">
              © {new Date().getFullYear()} Israeli Space Forum. All rights reserved.
            </div>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 