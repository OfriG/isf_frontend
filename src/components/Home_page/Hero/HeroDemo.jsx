export default async function Hero() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/pages?populate[home_page][populate]=*`, {
        cache: "no-store",
    });
    const data = await res.json();
    const heroData = data.data;
    return (
        <div className="hero">
            <div className="container">
                <div className="hero_content">
                    {
                        heroData.map((item) => {
                                return item.home_page.map((heroItem) => (
                                    <div key={`${item.id}-${heroItem.id}`}>
                                        <h1>{heroItem.header}</h1>
                                        <p>{heroItem.hilight_header}</p>
                                        <p>{heroItem.description}</p>
                                        {heroItem.button && (
                                            <div className="hero_button">
                                                <a href={heroItem.button.url}>
                                                    {heroItem.button.text}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ));
                           
                        })
                    }
                </div>
            </div>
        </div>
    );
}
