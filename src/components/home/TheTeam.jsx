import mike from "../../assets/images/team/Mike S&S headshot.png";
import chris from "../../assets/images/team/Chris S&S headshot.png";
import jesse from "../../assets/images/team/Jesse S&S headshot.png";
import thom from "../../assets/images/team/Thom S&S headshot.png";
import kyle from "../../assets/images/team/Kyle S&S headshot.png";

import text from "../../assets/images/team/who-we-are-text.png";

export default function TheTeam() {
    // Array of imported images
    const teamPhotos = [mike, chris, jesse, thom, kyle];

    return (
        <section
            id="the-team"
            className="flex max-h-[75%] w-full flex-col items-center justify-center gap-10 py-10 align-middle"
        >
            <h2 className="w-full py-0 text-center text-4xl font-bold uppercase tracking-widest text-secondary md:py-10">
                who we are
            </h2>

            <div className="flex flex-col-reverse md:flex-row">
                <div className="flex flex-row gap-3 md:flex-col md:gap-5">
                    {teamPhotos.map((photo, index) => (
                        <img
                            draggable="false"
                            src={photo}
                            key={index}
                            className="aspect-square w-1/6 select-none hover:invert md:w-3/4"
                        />
                    ))}
                </div>
                <div className="w-full md:grow">
                    <img
                        className="pointer-events-none select-none"
                        draggable="false"
                        src={text}
                    />
                    {/* <p className="text-2xl font-semibold leading-8 tracking-[.35em]">
                        Supporting the needs of diverse and emerging filmmakers
                        is the driving force here at Safe & Sound. As passionate
                        artists ourselves we know the obsession that goes into
                        crafting that perfect story, and how important it is to
                        feel{" "}
                        <span className="text-accent">
                            safe and empowered in our decisions.
                        </span>
                        <br />
                        <br />
                        Our small team comes with the work experience and
                        technical ability of a large post-audio studio without
                        sacrificing that fun, personalized atmosphere you can
                        only find with people truly invested in seeing your art
                        succeed.
                        <br />
                        <br />
                        We&apos;re forever dedicated to learning, and creating a
                        space{" "}
                        <span className="text-accent">
                            free of hate discrimination and &quot;bad
                            ideas&quot;.
                        </span>
                        <br />
                        <br />
                        With us, you are always{" "}
                        <span className="text-accent">Safe & Sound.</span>
                    </p> */}
                </div>
            </div>
        </section>
    );
}
