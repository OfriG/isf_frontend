import Footer from "@/components/Footer/Footer";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "ISF - Strapi + Next.js",
  description: "ISF project with Strapi backend and Next.js frontend",
};

export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/sections?populate=*`, {
    cache: "no-store",
  });

  const sections = await res.json();
  const links = sections?.data?.[0]?.menu || [];

  return (
    <html lang="en">
      <body>
        <div >
          <Header links={links} />
          <main className="container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
