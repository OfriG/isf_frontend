import Hero from "@/components/Home_page/Hero/Hero";
import Banner from "@/components/Home_page/Banner/Banner";
import React from "react";

import Link from 'next/link';

async function getAllTeamMembers() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const membersPromise = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/members`,
      { 
        cache: 'no-store',
        signal: controller.signal 
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!membersPromise.ok) {
      throw new Error('Failed to fetch members');
    }
    
    const members = await membersPromise.json();
    return members.data || [];
  } catch (error) {
    console.log('Failed to fetch team members:', error.message);
    return [];
  }
}

export default async function Home() {
  const members = await getAllTeamMembers();

  return (
    <div>
      <Hero/>
      <Banner/>
      
      {members.length > 0 && (
        <>
          <h1>Our Team</h1>
          <div>
            {members.map(member => {
              return (
                <div key={member.slug}>
                  <Link href={`/our-team/${member.slug}`}>{member.name}</Link>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  );
}
