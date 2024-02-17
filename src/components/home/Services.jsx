import PropTypes from "prop-types";
// import { useEffect, useState } from "react";

const images = Object.values(
    import.meta.glob("@services/*.{png,jpg,jpeg,PNG,JPEG}", {
        eager: true,
        query: "?url",
    }),
).map((x) => x.default);

const serviceImages = images.filter((x) => x.includes("service-"));
const generalImages = images.filter((x) => !x.includes("service-"));

export default function Services() {
    return (
        <section
            id="services"
            className="flex w-full flex-col items-center justify-center gap-10 py-10 align-middle"
        >
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                services
            </h2>
            <div className="flex w-full items-center justify-center gap-5 align-middle text-primary">
                <ServiceCard
                    title={"adr /\nv.O rec"}
                    aHref={"#contact"}
                    imgSrc={serviceImages[0]}
                    serviceDescription={
                        "Subtle breaths, blood curt- ling screams, and everyt- hing in between. We create a safe space for the talent to feel they try anything. We strive for high quality studio sound while captu- ring honest performances."
                    }
                />
                <ServiceCard
                    title={"sound\ndesign"}
                    aHref={"#contact"}
                    imgSrc={serviceImages[1]}
                    serviceDescription={
                        "Whether it's reating an otherworldly sound we have never heard before, to making that old door creak just right. We can offer blockbuster level quality with our personality engrained in every sound."
                    }
                />
                <ServiceCard
                    title={"foley"}
                    aHref={"#contact"}
                    imgSrc={serviceImages[2]}
                    serviceDescription={
                        "Need new couple walking in fresh snow to feel just right? Do you want to feel that bone break on the \"end it all\" punch? We can offer Foley that will have you ask the question, did we get that on set?\"."
                    }
                />
                <ServiceCard
                    title={"mixing"}
                    aHref={"#contact"}
                    imgSrc={serviceImages[3]}
                    serviceDescription={
                        "Its time to put the puzzle together. A mix is like a dance, and we want to create dynamics while not sacrificing watchability on any format and ensure the audience can be fully immersed in the story."
                    }
                />
                <ServiceCard
                    title={"music /\nscore"}
                    aHref={"#contact"}
                    imgSrc={serviceImages[4]}
                    serviceDescription={
                        "We think music is integral to the storytelling process. From an eerie synth symphony to a vibrant orchestral epic. We want to use music to evoke the emotional response the story desires and deserves."
                    }
                />
            </div>
            <div className="h-fit w-full bg-[#f3f3f4] px-16">
                <div className="flex items-center justify-between py-5 align-middle text-6xl">
                    <h4 className="w-fit text-left text-6xl font-bold uppercase italic tracking-wide text-black">
                        the total package
                    </h4>
                    <img
                        className="h-[1.2em] text-6xl"
                        src={generalImages.filter((x) =>
                            x.includes("code2.png"),
                        )}
                    />
                </div>
                <img src={images.find((x) => x.includes("black-line"))} />
                <div className="flex h-fit items-center justify-between py-6 align-middle">
                    <p className="w-[65%] text-justify text-lg leading-5 tracking-widest text-black">
                        Everything listed above with our heart and soul in every
                        aspect. We work with you from beginning to end to take
                        your vision and make it a reality. As a team, we
                        collaborate and will have sound designers work with the
                        composer or Foley work with the ADR recordist to ensure
                        we can tell your story in the best possible way. Dive in
                        head first with us and learn what makes us Safe & Sound.
                    </p>
                    <a
                        className="w-fit rounded-[1.1em] bg-black px-10 py-8 text-5xl font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black"
                        href="#contact"
                    >
                        book now
                    </a>
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ title, imgSrc, aHref, serviceDescription }) {
    return (
        <div className="flex w-[20%] flex-col gap-5 text-[#f3f3f4]">
            <div className="flex h-[2em] items-center align-middle text-6xl">
                <h3 className=" h-fit whitespace-pre text-left font-bold uppercase italic">
                    {title}
                </h3>
            </div>
            <div className="grid h-8 w-full  grid-cols-1 grid-rows-1">
                <img
                    draggable="false"
                    src={images.find((x) => x.includes("white-line"))}
                />
            </div>
            <p className="text-justify tracking-wider leading-5">
                {serviceDescription}
            </p>
            <img draggable="false" src={imgSrc} />
            <a
                href={aHref}
                className="h-full w-full rounded-full bg-[#f3f3f4] py-2 text-center text-3xl font-bold uppercase tracking-widest text-black hover:bg-black hover:text-[#f3f3f4]"
            >
                book now
            </a>
            <div className="flex flex-col">
                <img
                    draggable="false"
                    src={generalImages.find((x) => x.includes("code.png"))}
                />
                <span className="m-0 w-full p-0 text-center text-sm uppercase">
                    safe&sØundpost
                </span>
            </div>
        </div>
    );
}

ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    aHref: PropTypes.string,
    serviceDescription: PropTypes.string,
};
