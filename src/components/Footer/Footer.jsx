'use client';

import NewsLetter from "../NewsLetter/NewsLetter";
import './Footer.scss';
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import Logo from "../logo";

async function getFooterData() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  const urls = {
    oldFooter: `${baseUrl}/api/footer?populate=*`,
    newFooter: `${baseUrl}/api/new-footer-api?populate=*`,
    gallery: `${baseUrl}/api/footer?populate[footer_gallery][populate]=*`
  };

  const [oldRes, newRes, galleryRes] = await Promise.all([
    fetch(urls.oldFooter, { cache: 'no-store' }),
    fetch(urls.newFooter, { cache: 'no-store' }),
    fetch(urls.gallery, { cache: 'no-store' })
  ]);

  const [oldData, newData, galleryData] = await Promise.all([oldRes.json(), newRes.json(), galleryRes.json()]);

  return {
    oldFooter: oldData.data,
    newFooter: newData.data,
    gallery: galleryData.data
  };
}

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  useEffect(() => {
    getFooterData().then(setFooterData);
  }, []);

  useEffect(() => {
    const initStars = () => {
      if (typeof window !== 'undefined' && window.StarsBackground) {
        const container = document.querySelector('footer .stars-container');
        if (container) {
          new window.StarsBackground(container);
        }
      }
    };
    initStars();
    const timeoutId = setTimeout(initStars, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!footerData) return <div>Loading...</div>;

  const oldFooter = footerData.oldFooter;
  const gallery = footerData.gallery;
  
  // Debug: Log the footer data to see if logos are loaded
  console.log('Footer data:', oldFooter);
  console.log('Logo data:', oldFooter?.logo);
  console.log('Power logo data:', oldFooter?.power_logo);

  return (
    <>
      <Script
        src="/resources/js/starsBackground.js"
        strategy="afterInteractive"
        onLoad={() => {
          const container = document.querySelector('footer .stars-container');
          if (container && window.StarsBackground) {
            new window.StarsBackground(container);
          }
        }}
      />
      <footer>
        <div className="stars-container "></div>
        <div className="container">
          <div className="footer-content ">
            <div className="footer_logo justify-between">
              <div className="logo-container" style={{ position: 'relative', zIndex: 10 }}>
                <Logo width={52} height={40} />
              </div>
              <div className="flex flex-row gap-1 items-center" >
                <span className="text-white ">{oldFooter.power_logo?.text}</span>
                  <Image
                    src= 'http://localhost:1337/uploads/3b4fd967f0aca6017c8655490a405bdc4fc97326_6d072b2424.png'
                    alt={oldFooter.power_logo?.text}
                    width={40.676}
                    height={23.13}
                    style={{ position: 'relative', zIndex: 10  }}
                  />
              </div>
            </div>

            <NewsLetter />

            <div className="footer-menus pt-[0.852rem] flex flex-row px-8 justify-between">
              <div className="newsletter_left_menu ">
                <ul>
                  {oldFooter.left_menu?.map((item) => (
                    <li  key={item.id}>
                      <a href={`/${item.url}`} className="text-white text-center leading-[1.125rem] font-semibold">{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="newsletter_right_menu">
                <ul>
                  {oldFooter.right_menu?.map((item) => (
                    <li key={item.id}>
                      <a href={`/${item.url}`} className="text-white text-center text-[0.75rem] leading-[1.125rem] font-normal ">{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-[2.854rem] text-[0.625rem] font-light leading-normal px-6 text-white">{oldFooter.description_logo?.description}
          <Image src="http://localhost:1337/uploads/Moveo_1_1_cb8c0010b5.png" alt="Moveo" width={47} height={7} className="flex-shrink-0 w-[47px] h-[7px] ml-1"/>
          </div>
           <div className="text-[0.625rem] font-light leading- normal px-6  mb-[15px] text-white whitespace-pre-line">
             {oldFooter.description} 
           </div>
           <div className="flex flex-row gap-2 px-6 pt-[15px] bg-[linear-gradient(93deg,#64E275_-19.22%,#11B6BC_48.12%,#1776B1_115.47%)] justify-between">
            {gallery?.footer_gallery?.gallery && Array.isArray(gallery.footer_gallery.gallery) && gallery.footer_gallery.gallery.map((item, index) => (
              <Image className="mt-[12px] mb-[17.76px] " key={item.id || index} src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${item.url}`} alt={item.alternativeText || item.name} width={item.width} height={item.height} />
            ))}
            
           </div>

       
        </div>
      </footer>
    </>
  );
}
