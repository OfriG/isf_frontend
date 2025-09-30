'use client';

import { useEffect, useState } from "react";

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
        <div className="newsletter">
            <div className="newsletter_header">{newsLetter.newsletter?.header}</div>
            <div className="newsletter_description">{newsLetter.newsletter?.description}</div>
            <div className="newsletter_email">{newsLetter.newsletter?.email}</div>

            <div className="newsletter_button">{newsLetter.newsletter?.button.text} </div>
            <div className="newsletter_line">_</div>
</div>
    );
}
