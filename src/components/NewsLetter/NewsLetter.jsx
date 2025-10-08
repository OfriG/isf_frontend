'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

async function getNewsLetterData() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/footer?populate[logo][populate]=*&populate[power_logo][populate]=*&populate[left_menu][populate]=*&populate[right_menu][populate]=*&populate[newsletter][populate]=*`,
        { cache: "no-store" }
    );
    const data = await response.json();
    return data.data;
}

export default function NewsLetter() {
    const [newsLetter, setNewsLetter] = useState(null);

    useEffect(() => {
        getNewsLetterData().then(setNewsLetter);
    }, []);

    if (!newsLetter) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-6  flex flex-col gap-2.5">
            <div className="w-60 text-white text-2xl font-normal leading-normal">
                {newsLetter.newsletter?.header}
            </div>
            <div className="mr-[81.61px] text-white text-xs font-light leading-normal">
                {newsLetter.newsletter?.description}
            </div>
            <div className="mr-[26.86px] pt-[11px] pb-[11px] pl-[11px] h-10 flex-shrink-0 rounded-[2px] border-[0.5px] border-black bg-white text-[#DFDFDF] font-sans text-[15px] font-normal leading-[18px]">
                Email
            </div>
            <div className="flex flex-row justify-between pr-[26.86px]">
            <div className="w-24 h-7 mb-[47.31px] text-white inline-flex px-5 py-1.5 justify-center items-center gap-1 rounded border border-white text-xs font-bold leading-normal">
                {newsLetter.newsletter?.button.text}
            </div>
            <div className="w-6 h-6">
                <Image 
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${newsLetter.newsletter?.socail_img?.url}`}
                    alt={newsLetter.newsletter?.socail_img?.alternativeText || 'Social media icon'}
                    width={25}
                    height={25}
                    className="w-full h-full object-contain"
                />
            </div></div>
            <div className="mr-[26.86px] ml-[0] h-1 rounded-[2px] border-[0.5px] bg-white"></div>
        </div>
    );
}
