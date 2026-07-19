import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import serviceDecoration from "../../assets/images/symbols/services.png";

const preImgs = import.meta.glob("@services/*.{png,jpg,jpeg,PNG,JPEG}", {
    eager: true,
    query: "?url",
});
const images = Object.keys(preImgs)
    .map((k) => ({
        imgName: k.split("/").slice(-1).pop(),
        imgSrc: preImgs[k].default,
    }))
    .reduce((obj, item) => Object.assign(obj, { [item.imgName]: item.imgSrc }), {});

// Pre-v2 services design, restored from the original one-pager. "Book now"
// deep-links to the contact page with the inquiry subject pre-filled.
const bookHref = (message) => `/contact?subject=${encodeURIComponent(message)}`;

const services = [
    {
        title: "adr/v.O\nrecording",
        image: "service-1.png",
        message: "Booking Inquiry – ADR/VO Recording Services - PROJECT TITLE",
        description:
            "Subtle breaths, blood curdling screams, and everything in between. We create a safe space for the talent to feel they can try anything. We strive for high quality studio sound while capturing honest performances.",
    },
    {
        title: "dialogue\nediting",
        image: "service-dialogue.png",
        message: "Booking Inquiry – Dialogue Editing Services - PROJECT TITLE",
        description:
            "Close cuts, smooth fades, clever comps. Everything we do makes your performance shine. We care deeply about keeping original performances intact, using our tools and our editing instincts to make every decision count.",
    },
    {
        title: "sound\ndesign",
        image: "service-2.png",
        message: "Booking Inquiry – Sound Design Services - PROJECT TITLE",
        description:
            "Whether it's creating an otherworldly sound we have never heard before, to making that old door creak just right. We can offer blockbuster level quality with our personality engrained in every sound.",
        // Cards may carry one secondary link to a deeper page.
        feature: { to: "/horror-box", label: "play the horror box →" },
    },
    {
        title: "foley",
        image: "service-3.png",
        message: "Booking Inquiry – Live Foley Recording / Editing Services - PROJECT TITLE",
        description:
            // eslint-disable-next-line quotes
            `Need the new couple walking in fresh snow to feel just right? Do you want to feel that bone break on the "end it all" punch? We can offer Foley that will have you ask the question, did we get that on set?`,
    },
    {
        title: "mixing",
        image: "service-4.png",
        message: "Booking Inquiry – Mixing Services - PROJECT TITLE",
        description:
            "Its time to put the puzzle together. A mix is like a dance, and we want to create dynamics while not sacrificing watchability on any format and ensure the audience can be fully immersed in the story.",
    },
];

export default function Services() {
    const [openTitles, setOpenTitles] = useState(new Set());
    const allOpen = openTitles.size === services.length;

    const toggleCard = (title) => {
        setOpenTitles((prev) => {
            const next = new Set(prev);
            if (next.has(title)) next.delete(title);
            else next.add(title);
            return next;
        });
    };

    // master barcode easter egg: scan once to reveal every service, again to close
    const toggleAll = () => setOpenTitles(allOpen ? new Set() : new Set(services.map((x) => x.title)));

    return (
        <section id="services" className="relative m-auto flex w-full flex-col items-center justify-center gap-10 align-middle">
            <div className="text-primary flex w-full flex-col gap-12 max-md:mb-16 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-5">
                {services.map((service) => (
                    <ServiceCard
                        key={service.title}
                        title={service.title}
                        imgSrc={images[service.image]}
                        serviceDescription={service.description}
                        message={service.message}
                        feature={service.feature}
                        open={openTitles.has(service.title)}
                        onToggle={() => toggleCard(service.title)}
                    />
                ))}
            </div>
            <div className="h-fit w-full bg-[#f3f3f4] px-8 py-5 max-md:flex max-md:flex-col max-md:gap-3 md:w-[80%] md:px-10 md:py-0 xl:w-full xl:px-16">
                <div className="flex items-center justify-between py-0 align-middle text-3xl md:py-5 md:text-2xl xl:text-6xl">
                    <h4 className="w-full text-center text-3xl font-bold tracking-wide text-black uppercase italic md:w-fit md:text-left md:text-3xl xl:text-6xl">
                        the total package
                    </h4>
                    <button
                        type="button"
                        className="cursor-pointer transition-opacity hover:opacity-75 max-md:hidden"
                        onClick={toggleAll}
                        aria-expanded={allOpen}
                        aria-label="Toggle all service descriptions"
                    >
                        <img className="h-[1.2em] select-none md:h-[2.5rem] xl:h-[5rem]" src={images["code2.png"]} alt="Barcode decorator" />
                    </button>
                </div>
                <img className="select-none max-md:hidden" src={images["black-line.png"]} alt="Separator decorator" />
                <div className="flex h-fit flex-col items-center justify-between gap-6 py-0 align-middle md:py-6 lg:flex-col xl:flex-row xl:gap-7">
                    <p className="w-full text-left text-xs leading-3 tracking-widest text-black md:w-full md:text-base md:leading-5 xl:w-[80%] xl:text-xl">
                        Everything listed above with our heart and soul in every aspect. We work with you from beginning to end to take your vision
                        and make it a reality. As a team, each department collaborates to ensure we can tell your story in the best possible way.
                        Dive in head first with us and learn what makes us Safe &amp; Sound.
                    </p>
                    <Link
                        className="w-fit rounded-[1.1em] bg-black px-8 py-2 text-2xl font-bold tracking-widest text-white uppercase hover:bg-white hover:text-black md:w-full md:px-10 md:py-5 md:text-center md:text-xl lg:w-full lg:px-8 lg:py-5 lg:text-center lg:text-xl xl:w-2/4 xl:px-10 xl:py-6 xl:text-3xl 2xl:text-5xl"
                        to={bookHref("Booking Inquiry – Total Post Sound Package (ADR, VO, Foley, Mixing) - PROJECT TITLE")}
                    >
                        book now
                    </Link>
                </div>
            </div>
            <img
                className="absolute -right-[75%] bottom-48 -z-20 max-md:scale-75 md:-right-[47%] md:bottom-0 md:w-[33vw] lg:-right-[65%]"
                src={serviceDecoration}
                alt="Services page decorator"
            />
        </section>
    );
}

function ServiceCard({ title, imgSrc, serviceDescription, message, feature, open, onToggle }) {
    return (
        <div className="flex w-full flex-col gap-4 md:gap-5 md:text-[#f3f3f4]">
            <button
                className="hover:text-secondary flex w-full cursor-pointer items-end justify-between gap-2 text-left text-3xl transition-colors md:min-h-24 md:text-4xl xl:min-h-16 xl:text-[clamp(1.1rem,1.5vw,1.9rem)]"
                onClick={onToggle}
                aria-expanded={open}
            >
                <h3 className="h-fit font-bold whitespace-pre uppercase italic">{title}</h3>
                <IoChevronDown className={`mb-1 size-6 shrink-0 transition-transform duration-300 md:mr-4 md:size-7 ${open ? "rotate-180" : ""}`} />
            </button>
            <div className="grid h-8 w-full grid-cols-1 grid-rows-1 max-md:hidden">
                <img className="select-none" draggable="false" src={images["white-line.png"]} alt="Separator" />
            </div>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                    <p className="pb-1 text-left text-xs leading-[1.4em] tracking-wider md:mr-3 md:min-h-40 md:text-sm md:leading-5 xl:min-h-72 xl:text-base 2xl:min-h-56">
                        {serviceDescription}
                    </p>
                </div>
            </div>
            {/* The source PNGs vary a few px in width; a fixed aspect keeps every
                card's image the same rendered height so the rows align. */}
            <img draggable="false" src={imgSrc} className="aspect-[246/177] w-full object-cover select-none" alt={title.replace("\n", " ")} />
            <Link
                to={bookHref(message)}
                className="h-fit w-full rounded-full bg-[#f3f3f4] py-1 text-center text-lg font-bold tracking-widest text-black uppercase hover:bg-black hover:text-[#f3f3f4] md:py-2 md:text-base xl:text-2xl"
            >
                book now
            </Link>
            {/* easter egg: "scanning" the barcode also reveals the description */}
            <button
                type="button"
                className="flex cursor-pointer flex-col transition-opacity hover:opacity-75 max-md:hidden"
                onClick={onToggle}
                aria-expanded={open}
                aria-label={`Toggle ${title.replace("\n", " ")} description`}
            >
                <img className="select-none" draggable="false" src={images["code.png"]} alt="Barcode" />
                <span className="m-0 w-full p-0 text-center text-sm uppercase">safe&amp;sØundpost</span>
            </button>
            <span className="m-0 w-full p-0 text-center text-sm uppercase md:hidden">safe&amp;sØundpost</span>
            {/* Secondary link sits below the barcode so the cards' images, buttons
                and barcodes stay aligned across the row. */}
            {feature && (
                <Link
                    to={feature.to}
                    className="hover:text-secondary w-full text-center text-xs font-bold tracking-widest underline underline-offset-4 uppercase"
                >
                    {feature.label}
                </Link>
            )}
        </div>
    );
}

ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    serviceDescription: PropTypes.string,
    message: PropTypes.string,
    feature: PropTypes.shape({ to: PropTypes.string.isRequired, label: PropTypes.string.isRequired }),
    open: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};
