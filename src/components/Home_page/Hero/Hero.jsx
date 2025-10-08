'use client';

import './Hero.scss';
import Script from "next/script";
import { useEffect, useState } from "react";

async function getHeroData() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/pages?populate[home_page][populate]=*`, {
            cache: "no-store",
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
            throw new Error('Failed to fetch hero data');
        }
        
        const data = await res.json();
        return data.data?.[0]?.home_page?.filter(item => item.__component === 'hp-hero.hp-hero') || [];
    } catch (error) {
        console.log('Failed to fetch hero data:', error.message);
        return [];
    }
}

export default function Hero() {
    const [heroData, setHeroData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        getHeroData()
            .then(data => {
                setHeroData(data);
                if (!data || data.length === 0) {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }, []);

    if (error || (heroData && heroData.length === 0)) {
        // Render fallback hero content when Strapi data unavailable
        return (
            <section className="homepage-hero homepage-hero-block bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20">
                <div className="responsive-container max-w-6xl mx-auto px-4">
                    <div className="content-wrapper text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Shaping the future of space
                            <br />
                            <span className="gradient-text bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Together</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            The Israel Space Forum is dedicated to advancing Israel's position in the global space industry through innovation, collaboration, and strategic partnerships.
                        </p>
                        <a className="joinud-btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors" href="/join-us">
                            JOIN US
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    if (!heroData) {
        return <div className="py-20 text-center">Loading...</div>;
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
                        {heroData.map(heroItem => (
                            <div key={heroItem.id}>
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
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
