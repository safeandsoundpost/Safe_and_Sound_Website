import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const featured_list = [
    {
        name: "Fibe",
        logo: "tv1-logo.svg",
        caption: "Fibe TV1 Logo.",
        tooltip: "TV1",
        h: "h-24 md:h-48",
        url: "https://tv1.bell.ca/fibetv1",
    },
    {
        name: "Canadian Film Centre",
        logo: "cfc-logo.png",
        caption: "Canadian Film Centre Logo.",
        tooltip: "CFC",
        h: "h-24 md:h-52",
        url: "https://www.cfccreates.com/",
    },
    {
        name: "Canfro",
        logo: "canfro-white-logo.webp",
        caption: "Canfro Logo.",
        tooltip: "Canfro",
        h: "h-14 md:h-28",
        url: "https://canfroproductions.com/",
    },
];

// Banner-shaped logo (~9:1) — sized by width on its own row, since a height
// that matches the square-ish featured logos would make it absurdly wide.
const academy_banner = {
    name: "Academy of Canadian Cinema & Television",
    logo: "academy-logo.png",
    caption: "Academy of Canadian Cinema and Television Logo.",
    tooltip: "The Academy",
    wClass: "w-80 max-w-[88vw] md:w-[34rem]",
    url: "https://www.academy.ca/",
};

const secondary_list = [
    {
        name: "L50",
        logo: "l50-logo.webp",
        caption: "L50 Logo",
        tooltip: "L50",
        h: "h-10 md:h-14",
        hBig: "h-16 md:h-20",
        url: "https://www.letter50films.com/",
    },
    {
        name: "AYF",
        logo: "ayf-white-logo.webp",
        caption: "AYF Logo, white version.",
        tooltip: "AYF",
        h: "h-10 md:h-14",
        hBig: "h-16 md:h-20",
        url: "https://www.jadeyurichfilms.com/",
    },
    {
        name: "Webseries Canada",
        logo: "webseries-canada-logo.webp",
        caption: "Webseries Canada Logo",
        tooltip: "WSC",
        h: "h-7 md:h-10",
        hBig: "h-10 md:h-12",
        url: "https://webseriescanada.org/",
    },
    {
        name: "TFP",
        logo: "tfp-logo.webp",
        caption: "TFP Logo.",
        tooltip: "TFP",
        // The TFP artwork has built-in padding inside its square canvas, so it
        // gets a taller box to read the same optical size as its neighbours.
        h: "h-14 md:h-20",
        hBig: "h-20 md:h-24",
        url: "https://www.instagram.com/torontofilmplug?igsh=NXRkOGs2N2t6OXY2",
    },
    {
        name: "QUIP",
        logo: "quip-logo.png",
        caption: "QUIP Logo.",
        tooltip: "QUIP",
        raw: true,
        h: "h-9 md:h-12",
        hBig: "h-12 md:h-16",
        url: "https://www.queerinpost.ca/",
    },
    {
        name: "Women in Post",
        logo: "wip-logo.webp",
        caption: "Women in Post Logo.",
        tooltip: "WIP",
        raw: true,
        h: "h-10 md:h-14",
        hBig: "h-16 md:h-20",
        url: "https://www.academy.ca/programs/womeninpost/",
    },
];

function useTilt(imgRefs) {
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (window.innerWidth < 768) return;

            imgRefs.current.forEach((img) => {
                if (!img) return;

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
    }, [imgRefs]);
}

const renderLogo = (x, i, sizeFallback, imgRefs, big = false) => (
    <a key={x.name} className="max-w-full scale-100 transition-transform active:scale-75" href={x.url} target="_blank">
        <figure className="perspective-near max-w-full before:text-xl! before:font-bold" data-tip={x.tooltip}>
            <img
                ref={imgRefs ? (el) => (imgRefs.current[i] = el) : undefined}
                className={`max-w-full object-contain object-center transition-transform duration-150 ease-out hover:scale-125 ${imgRefs ? "perspective-midrange transform-3d" : ""} ${x.wClass ? `h-auto ${x.wClass}` : `w-auto ${(big ? (x.hBig ?? x.h) : x.h) ?? x.w ?? sizeFallback}`} ${x.raw ? "" : "mix-blend-color-burn brightness-0 invert"} ${x.nudge ?? ""}`}
                src={`/images/clients/${x.logo}`}
            />
            <figcaption className="sr-only">{x.caption}</figcaption>
        </figure>
    </a>
);

export function FeaturedClients({ vertical = false }) {
    const imgRefs = useRef([]);
    useTilt(imgRefs);

    return (
        <div className={vertical ? "flex flex-col items-center gap-12 py-6" : "flex flex-col items-center gap-8 max-md:pb-14 md:gap-14 md:py-10"}>
            <div
                className={
                    vertical
                        ? "flex flex-col items-center justify-center gap-12 align-middle"
                        : // 3-column grid rather than a flex row so the middle logo (CFC)
                          // sits dead center regardless of its neighbours' widths. The
                          // padding keeps edge logos clear of the viewport edge so the
                          // hover zoom and cursor tilt don't get clipped.
                          "flex flex-col items-center justify-center gap-8 align-middle md:grid md:w-full md:grid-cols-3 md:place-items-center md:px-16"
                }
            >
                {featured_list.map((x, i) => renderLogo(x, i, "h-16 md:h-24", imgRefs))}
            </div>
            {renderLogo(academy_banner, featured_list.length, "h-16 md:h-24", imgRefs)}
        </div>
    );
}

FeaturedClients.propTypes = {
    vertical: PropTypes.bool,
};

export function PartnerClients({ vertical = false }) {
    return (
        <div
            className={
                vertical
                    ? "flex flex-col items-center justify-center gap-10 align-middle"
                    : "flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-8 px-4 align-middle md:flex-nowrap md:gap-10"
            }
        >
            {secondary_list.map((x, i) => renderLogo(x, i, "w-12 md:w-24", null, vertical))}
        </div>
    );
}

PartnerClients.propTypes = {
    vertical: PropTypes.bool,
};

export default function Clients() {
    return (
        <section id="clients" className="relative m-auto flex w-full flex-col items-center justify-center gap-14 pt-5 align-middle">
            {/* Mobile keeps the vertical stacks; desktop gets one even grid. */}
            <div className="contents md:hidden">
                <FeaturedClients vertical />
                <PartnerClients vertical />
            </div>
            <div className="hidden w-11/12 md:grid md:grid-cols-3 md:place-items-center md:gap-x-12 md:gap-y-16 lg:w-5/6">
                {featured_list.map((x, i) => renderLogo(x, i, "h-16 md:h-24", null, true))}
                <div className="col-span-3 flex justify-center">{renderLogo(academy_banner, 0, "h-16 md:h-24", null, true)}</div>
                {secondary_list.map((x, i) => renderLogo(x, i, "w-12 md:w-24", null, true))}
            </div>
        </section>
    );
}
