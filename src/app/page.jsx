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
      <h1>Our Team</h1>
      <div>
        {members.map(member => {
          return (
            <div>
              <Link href={`/our-team/${member.slug}`} >{member.name}</Link>
            </div>
          )
        })}
      </div>
    </div >

  );
}
