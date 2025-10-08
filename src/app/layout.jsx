import Footer from "@/components/Footer/Footer";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "ISF - Strapi + Next.js",
  description: "ISF project with Strapi backend and Next.js frontend",
};

export default async function RootLayout({ children }) {
  let links = [];
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/sections?populate=*`, {
      cache: "no-store",
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (res.ok) {
      const sections = await res.json();
      links = sections?.data?.[0]?.menu || [];
    }
  } catch (error) {
    // Fail silently during build - Header will use default/empty links
    console.log('Failed to fetch menu links:', error.message);
  }

  return (
    <html lang="en">
      <body>
        <div >
          <Header links={links} />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
