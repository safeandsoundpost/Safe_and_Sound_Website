import { useEffect, useRef } from "react";

const client_list = [
    {
        name: "Fibe",
        logo: "tv1-logo.svg",
        caption: "Fibe Logo.",
        tooltip: "Fibe",
        size: "xl",
    },
    {
        name: "L50",
        logo: "l50-logo.webp",
        caption: "L50 Logo",
        tooltip: "L50",
        size: "xl",
    },
    {
        name: "Canfro",
        logo: "canfro-logo.webp",
        caption: "Canfro Logo.",
        tooltip: "Canfro",
        size: "xl",
    },
    {
        name: "Webseries Canada",
        logo: "webseries-canada-logo.webp",
        caption: "Webseries Canada Logo",
        tooltip: "WSC",
        size: "xl",
    },
    {
        name: "TFP",
        logo: "tfp-logo.webp",
        caption: "TFP Logo.",
        tooltip: "TFP",
        inverted: true,
    },
    {
        name: "AYF",
        logo: "ayf-white-logo.webp",
        caption: "WYF Logo, white version.",
        tooltip: "WYF",
    },
    {
        name: "Dang Movies",
        logo: "dang-movies.webp",
        caption: "Dang Movies Logo",
        tooltip: "Dang Movies",
    },
];

export default function Clients() {
    const imgRefs = useRef([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            imgRefs.current.forEach((img) => {
                if (!img) return;
                if (document.width < 768) return;

                const rect = img.getBoundingClientRect();
                const imgCenterX = rect.left + rect.width / 2;
                const imgCenterY = rect.top + rect.height / 2;

                const offsetX = (e.clientX - imgCenterX) / (rect.width / 2);
                const offsetY = (e.clientY - imgCenterY) / (rect.height / 2);

                const rotateX = Math.tanh(offsetY) * -10;
                const rotateY = Math.tanh(offsetX) * 10;

                img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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
            <div className="flex flex-col flex-wrap items-center justify-center align-middle md:flex-row md:gap-24 md:py-10">
                {client_list.map((x, i) => (
                    <figure key={i} className="tooltip tooltip-secondary toolt perspective-near before:text-xl! before:font-bold" data-tip={x.tooltip}>
                        <img
                            ref={(el) => (imgRefs.current[i] = el)}
                            className={`aspect-square object-contain object-center mix-blend-color-burn transition-transform duration-150 ease-out perspective-midrange transform-3d hover:scale-125 ${x.inverted ? "invert" : ""} ${x.size && x.size == "xl" ? "w-40 md:w-72" : "w-28 md:w-52"}`}
                            src={`/images/clients/${x.logo}`}
                        />
                        <figcaption className="invisible">{x.caption}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}
