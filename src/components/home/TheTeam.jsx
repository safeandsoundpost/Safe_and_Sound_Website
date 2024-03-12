import mike from "../../assets/images/team/Mike S&S headshot.png";
import chris from "../../assets/images/team/Chris S&S headshot.png";
import jesse from "../../assets/images/team/Jesse S&S headshot.png";
import thom from "../../assets/images/team/Thom S&S headshot.png";

export default function TheTeam() {
    // Array of imported images
    const teamPhotos = [mike, chris, jesse, thom];

    return (
        <section
            id="the-team"
            className="flex w-full flex-col items-center justify-center gap-10 py-10 align-middle max-h-[75%]"
        >
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                who we are
            </h2>

            <div className="flex">
                <div className="flex flex-col gap-5">
                    {teamPhotos.map((photo, index) => (
                        <img draggable="false" src={photo} key={index} className="w-3/4 hover:invert select-none" />
                    ))}
                </div>
                <div className="w-full grow">
                    <p className="text-justify text-2xl font-semibold leading-8 tracking-[.35em]">
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
                    </p>
                </div>
            </div>
        </section>
    );
}

