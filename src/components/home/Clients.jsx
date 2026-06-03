import { useEffect, useRef } from "react";

const client_list = [
    {
        name: "Fibe",
        logo: "tv1-logo.svg",
        caption: "Fibe Logo.",
        tooltip: "Fibe",
        size: "xl",
        url: "https://tv1.bell.ca/fibetv1",
    },
    {
        name: "L50",
        logo: "l50-logo.webp",
        caption: "L50 Logo",
        tooltip: "L50",
        size: "xl",
        url: "https://www.letter50films.com/",
    },
    {
        name: "Canfro",
        logo: "canfro-white-logo.webp",
        caption: "Canfro Logo.",
        tooltip: "Canfro",
        size: "xl",
        url: "https://canfroproductions.com/",
    },
    {
        name: "Webseries Canada",
        logo: "webseries-canada-logo.webp",
        caption: "Webseries Canada Logo",
        tooltip: "WSC",
        size: "xl",
        url: "https://webseriescanada.org/",
    },
    {
        name: "TFP",
        logo: "tfp-logo.webp",
        caption: "TFP Logo.",
        tooltip: "TFP",
        url: "https://www.instagram.com/torontofilmplug?igsh=NXRkOGs2N2t6OXY2",
    },
    {
        name: "AYF",
        logo: "ayf-white-logo.webp",
        caption: "WYF Logo, white version.",
        tooltip: "WYF",
        url: "https://www.jadeyurichfilms.com/",
    },
    {
        name: "Canadian Film Centre",
        logo: "cfc-logo.png",
        caption: "Canadian Film Centre Logo.",
        tooltip: "CFC",
        size: "xl",
        url: "https://www.cfccreates.com/",
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
                    <a key={i} className="scale-100 transition-transform active:scale-75" href={x.url} target="_blank">
                        <figure className="perspective-near before:text-xl! before:font-bold" data-tip={x.tooltip}>
                            <img
                                ref={(el) => (imgRefs.current[i] = el)}
                                className={`aspect-square object-contain object-center transition-transform duration-150 ease-out perspective-midrange transform-3d hover:scale-125 ${x.raw ? "" : "mix-blend-color-burn brightness-0 invert"} ${x.size && x.size == "xl" ? "w-40 md:w-72" : "mx-auto w-28 md:w-52"}`}
                                src={`/images/clients/${x.logo}`}
                            />
                            <figcaption className="invisible">{x.caption}</figcaption>
                        </figure>
                    </a>
                ))}
            </div>
        </section>
    );
}
