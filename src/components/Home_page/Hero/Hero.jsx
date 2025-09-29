'use client';

import './Hero.scss';
import Script from "next/script";
import { useEffect, useState } from "react";

async function getHeroData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/pages?populate[home_page][populate]=*`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data.data;
}

export default function Hero() {
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        getHeroData().then(setHeroData);
    }, []);

    if (!heroData) {
        return <div>Loading...</div>;
    }
    
    return (
        <>
            <Script 
                src="/resources/js/starsBackground.js"
                strategy="afterInteractive"
                onLoad={() => {
                    const heroStarsContainer = document.querySelector('.homepage-hero-block .stars-container');
                    if (heroStarsContainer && window.StarsBackground) {
                        new window.StarsBackground(heroStarsContainer);
                    }
                }}
            />
            <div id={`homepage-hero-${Date.now()}`} className="homepage-hero homepage-hero-block">
                <div className="stars-container"></div>
            
            <div className="responsive-container">
                <div className="content-wrapper">
                    {
                        heroData.map((item) => {
                                return item.home_page.map((heroItem) => (
                                    <div key={`${item.id}-${heroItem.id}`}>
                                        <h1>
                                            {heroItem.header}
                                            {heroItem.hilight_header && (
                                                <>
                                                    <br />
                                                    <span className="gradient-text">{heroItem.hilight_header}</span>
                                                </>
                                            )}
                                        </h1>

                                        <p>{heroItem.description}</p>

                                        {heroItem.button && (
                                            <a className="joinud-btn" href={heroItem.button.url} target={heroItem.button.target || '_self'}>
                                                {heroItem.button.text}
                                            </a>
                                        )}
                                    </div>
                                ));
                           
                        })
                    }
                </div>
            </div>
            </div>
        </>
    );
}
