import PropTypes from "prop-types";
import serviceDecoration from "../../assets/images/symbols/services.png";

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
            className="relative m-auto flex w-full flex-col items-center justify-center gap-10 py-10 align-middle"
        >
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                services
            </h2>
            <div className="flex w-full flex-col flex-wrap items-center justify-center gap-12 align-middle text-primary max-md:mb-16 md:flex-row md:gap-5 lg:w-10/12 xl:w-full">
                {/* <div className="mb-16 grid w-full grid-flow-col-dense items-center justify-center gap-12 align-middle text-primary md:gap-5 md:mb-0"> */}
                <ServiceCard
                    title={"adr /\nv.O rec"}
                    aHref={"#contact"}
                    imgSrc={serviceImages[0]}
                    serviceDescription={
                        "Subtle breaths, blood curtling screams, and everything in between. We create a safe space for the talent to feel they try anything. We strive for high quality studio sound while capturing honest performances."
                    }
                />
                <ServiceCard
                    title={"sound\ndesign"}
                    aHref={"#contact"}
                    imgSrc={serviceImages[1]}
                    serviceDescription={
                        "Whether it's creating an otherworldly sound we have never heard before, to making that old door creak just right. We can offer blockbuster level quality with our personality engrained in every sound."
                    }
                />
                <ServiceCard
                    title={"foley"}
                    aHref={"#contact"}
                    imgSrc={serviceImages[2]}
                    serviceDescription={
                        // eslint-disable-next-line quotes
                        `Need new couple walking in fresh snow to feel just right? Do you want to feel that bone break on the "end it all" punch? We can offer Foley that will have you ask the question, did we get that on set?`
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
            <div className="h-fit w-screen bg-[#f3f3f4] px-8 py-5 max-md:flex max-md:flex-col max-md:gap-3 md:w-[80%] md:px-10 md:py-0 xl:w-full xl:px-16">
                <div className="flex items-center justify-between py-0 align-middle text-3xl md:py-5 md:text-2xl xl:text-6xl">
                    <h4 className="w-full text-center text-3xl font-bold uppercase italic tracking-wide text-black md:w-fit md:text-left md:text-3xl xl:text-6xl">
                        the total package
                    </h4>
                    <img
                        className="h-[1.2em] select-none max-md:hidden md:h-[2.5rem] xl:h-[5rem]"
                        src={generalImages.filter((x) =>
                            x.includes("code2.png"),
                        )}
                    />
                </div>
                <img
                    className="select-none max-md:hidden"
                    src={images.find((x) => x.includes("black-line"))}
                />
                <div className="flex h-fit flex-col items-center justify-between gap-6 py-0 align-middle md:py-6 lg:flex-col xl:flex-row xl:gap-7">
                    <p className="w-full text-justify text-xs leading-3 tracking-widest text-black md:w-full md:text-base md:leading-5 xl:w-[80%] xl:text-xl">
                        Everything listed above with our heart and soul in every
                        aspect. We work with you from beginning to end to take
                        your vision and make it a reality. As a team, we
                        collaborate and will have sound designers work with the
                        composer or Foley work with the ADR recordist to ensure
                        we can tell your story in the best possible way. Dive in
                        head first with us and learn what makes us Safe & Sound.
                    </p>
                    <a
                        className="w-fit rounded-[1.1em] bg-black px-8 py-2 text-2xl font-bold
                        uppercase tracking-widest text-white hover:bg-white hover:text-black 
                        md:w-full md:px-10 md:py-5 md:text-center md:text-xl
                        lg:w-full lg:px-8 lg:py-5 lg:text-center lg:text-xl
                        xl:w-2/4 xl:px-10 xl:py-6 xl:text-3xl 2xl:text-5xl"
                        href="#contact"
                    >
                        book now
                    </a>
                </div>
            </div>

            <img
                className="absolute -right-[75%] bottom-48 -z-20 
                max-md:scale-75 md:-right-[85%] md:bottom-0 md:-z-20
                xl:-right-[70%] 2xl:-right-[65%]"
                src={serviceDecoration}
            />
        </section>
    );
}

function ServiceCard({ title, imgSrc, aHref, serviceDescription }) {
    return (
        <div className="flex max-h-full min-h-full w-full flex-row items-stretch justify-between gap-5 text-[#f3f3f4] md:w-[37%] md:flex-col lg:w-[30%] 2xl:w-[17%] 2xl:flex-grow md:min-h-[640px] xl:min-h-[740px]">
            <div className="flex w-1/2 flex-auto flex-col gap-5 md:w-full self-stretch">
                <div className="flex h-[2em] items-center align-middle text-5xl md:text-4xl xl:text-5xl">
                    <h3 className="h-fit w-full whitespace-pre text-left font-bold uppercase italic">
                        {title}
                    </h3>
                </div>
                <div className="grid h-8 w-full grid-cols-1 grid-rows-1 max-md:hidden">
                    <img
                        className="select-none"
                        draggable="false"
                        src={images.find((x) => x.includes("white-line"))}
                    />
                </div>
                <p className="text-justify text-xs leading-[1.2em] tracking-wider md:text-sm md:leading-5 xl:text-base">
                    {serviceDescription}
                </p>
            </div>
            <div className="flex w-1/2 flex-col gap-5 md:w-full self-end">
                <img draggable="false" src={imgSrc} className="select-none" />
                <div className="flex flex-col md:hidden">
                    <span className="m-0 w-full p-0 text-center text-sm uppercase">
                        safe&sØundpost
                    </span>
                </div>
                <a
                    href={aHref}
                    className="h-fit w-full rounded-full bg-[#f3f3f4] py-1 text-center text-lg font-bold uppercase tracking-widest text-black hover:bg-black hover:text-[#f3f3f4] md:h-full md:py-2 md:text-base xl:text-2xl"
                >
                    book now
                </a>
                <div className="flex flex-col max-md:hidden">
                    <img
                        className="select-none"
                        draggable="false"
                        src={generalImages.find((x) => x.includes("code.png"))}
                    />
                    <span className="m-0 w-full p-0 text-center text-sm uppercase">
                        safe&sØundpost
                    </span>
                </div>
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
