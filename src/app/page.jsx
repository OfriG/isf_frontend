import Hero from "@/components/Home_page/Hero/Hero";
import Banner from "@/components/Home_page/Banner/Banner";
import React from "react";

import Link from 'next/link';
async function getAllTeamMembers() {
  const membersPromise = await fetch('http://localhost:1337/api/members');
  const members = await membersPromise.json();
  return members.data;
}

export default async function Home() {
  const members = await getAllTeamMembers();

  return (
    <div>
      <Hero/>
      <Banner/>
      
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
    </div>
  );
}
