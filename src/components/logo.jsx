'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";

export default function Logo({ width = 52.309, height = 40.671 }) {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/site-setting?populate=logo`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const siteSetting = await res.json();
        const url = siteSetting?.data?.logo?.url;   
        if (url) {
          setLogoUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`);
        }
      } catch (error) {
        console.warn("Failed to load logo from Strapi:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogo();
  }, []);

  if (loading) {
    return <div style={{ width, height }}>Loading...</div>;
  }
  return (
    <Image
      src={logoUrl}
      alt="Site Logo"
      width={width}
      height={height}
      priority
    />
  );
}
