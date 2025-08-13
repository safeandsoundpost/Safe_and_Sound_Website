import { useEffect, useRef } from "react";

const client_list = [
    {
        name: "AYF",
        logo: "ayf-white-logo.webp",
        caption: "WYF Logo, white version.",
        tooltip: "WYF",
    },
    {
        name: "Fibe",
        logo: "fibe-logo.webp",
        caption: "Fibe Logo.",
        tooltip: "Fibe",
    },
    {
        name: "TFP",
        logo: "tfp-logo.webp",
        caption: "TFP Logo.",
        tooltip: "TFP",
    },
];

export default function Clients() {
    const imgRefs = useRef([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            imgRefs.current.forEach((img) => {
                if (!img) return;

                const rect = img.getBoundingClientRect();
                const imgCenterX = rect.left + rect.width / 2;
                const imgCenterY = rect.top + rect.height / 2;

                // Get offset from center (-1 to 1 range)
                const offsetX = (e.clientX - imgCenterX) / (rect.width / 2);
                const offsetY = (e.clientY - imgCenterY) / (rect.height / 2);

                // Limit the tilt
                const rotateX = offsetY * -10; // Invert so moving down tilts back
                const rotateY = offsetX * 10;

                img.style.transform = `rotateX(${rotateX * 0.2}deg) rotateY(${rotateY * 0.2}deg)`;
            });
        };

        const resetTilt = () => {
            imgRefs.current.forEach((img) => {
                if (!img) return;
                img.style.transform = "rotateX(0deg) rotateY(0deg)";
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", resetTilt);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", resetTilt);
        };
    }, []);

    return (
        <section id="clients" className="relative m-auto flex w-full flex-col items-center justify-center gap-10 pt-5 align-middle">
            <h2 className="text-secondary w-full pt-10 text-center text-4xl font-bold tracking-widest uppercase">Clients / Partnerships</h2>
            <div className="flex items-center justify-center gap-24 py-10">
                {client_list.map((x, i) => (
                    <figure key={i} className="tooltip tooltip-secondary toolt perspective-near before:text-xl! before:font-bold" data-tip={x.tooltip}>
                        <img
                            ref={(el) => (imgRefs.current[i] = el)}
                            className="aspect-square w-72 object-contain object-center mix-blend-color-burn transition-transform duration-150 ease-out perspective-midrange transform-3d hover:scale-125"
                            src={`/images/clients/${x.logo}`}
                        />
                        <figcaption className="invisible">{x.caption}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
