'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

async function getBannerData(){
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/pages?populate[home_page][populate]=*`, {
            cache: "no-store",
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
            throw new Error('Failed to fetch banner data');
        }
        
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.log('Failed to fetch banner data:', error.message);
        return [];
    }
}

export default function Banner(){
    const [bannerData, setBannerData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        getBannerData()
            .then(data => {
                setBannerData(data);
                if (!data || data.length === 0) {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }, []);

    if (error) {
        return null; // Render nothing if data unavailable
    }

    if (!bannerData) {
        return <div>Loading...</div>;
    }

    // Extract banner component from the data
    const bannerComponent = bannerData[0]?.home_page?.find(
        component => component.__component === "hp-hero.banner"
    );

    if (!bannerComponent) {
        return null; // Render nothing if no banner data
    }

    return (
<div className="bg-background bg-gradient-to-r from-green-500 to-blue-500 h-full">
  <div className="pl-[5.74125rem] pr-[5.74125rem] pb-[5.102rem] pt-[5.75875rem] 
                  md:pt-[1.831rem] md:pr-[11.13rem] md:pb-[2.115rem] md:pl-[13.053rem]">
<div className="relative mx-auto max-w-[1440px]">

    <div className="flex flex-col md:flex-row md:items-center">
      {bannerComponent.header_description?.map((stat, index) => (
        <div key={stat.id} className="flex flex-col md:flex-row md:items-center">
          <div className="text-center md:flex md:flex-row md:items-center">
            <h1 className="text-white  text-[3.4375rem] font-normal leading-normal uppercase md:text-[5.5rem]">{stat.header}</h1>
              <p className="text-white text-[0.9375rem] font-normal leading-normal mb-[29.24px] uppercase mb-[4.638125rem] md:text-2xl md:mb-0 md:ml-[2.774375rem] md:pt-[5rem] md:pb-[5rem]">{stat.description}</p>
          </div>
          
          {index < bannerComponent.header_description.length - 1 && (
            <div className="flex items-center justify-center mx-[2.774375rem]">
              <div className="w-[0.125rem] h-[3.852rem]  bg-white flex-shrink-0 rotate-90 md:rotate-0"></div>
            </div>
          )}
        </div>
      ))}
    </div>
    
    <div className="text-white text-center text-[0.9375rem] font-normal leading-normal uppercase w-full md:pt-[1.01rem] md:text-left md:pb-[2.115rem]">
      {bannerComponent.description}
    </div>

  </div>
</div></div>

    );

}