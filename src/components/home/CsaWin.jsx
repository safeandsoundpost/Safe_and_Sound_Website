import { useEffect, useRef, useState } from "react";

export default function CsaWin() {
    const sectionRef = useRef(null);
    const [seen, setSeen] = useState(false);

    // Reveal once when the section scrolls into view.
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSeen(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.45 },
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        // mobile: pt-16 + pb-0 makes the gap above the artwork match the gap
        // below it (the posters section brings its own 64px top padding)
        <section ref={sectionRef} id="csa-win" className="w-full bg-black pt-16 pb-0 md:py-12">
            <img
                src="/images/awards-collage.png"
                alt="Canadian Screen Awards — CSA trophy with laurels: Winner, Best Digital Series Fiction 2026; Winner, Best Director Katie Uhlmann 2026; Nominee, Best Web Program or Series Fiction 2025"
                draggable="false"
                className={`m-auto w-full max-w-6xl px-4 select-none ${seen ? "animate-fade-up animate-duration-1000 animate-ease-out" : "opacity-0"}`}
            />
        </section>
    );
}
