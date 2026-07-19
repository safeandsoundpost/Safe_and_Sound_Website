import { Link } from "react-router-dom";
import boxPhoto from "../../assets/images/horror-box/box.webp";

// Home page teaser for the Horror Box page. Deliberately a slim banner
// rather than another photo block: it sits directly under the poster grid and
// a second large image there competes with the work above it.
export default function HorrorBox() {
    return (
        <section id="horror-box" className="m-auto w-11/12 py-10 md:py-14 lg:w-11/12 xl:w-4/5">
            <Link
                to="/horror-box"
                className="group relative flex h-[clamp(12rem,23vw,17rem)] w-full items-center overflow-hidden"
                aria-label="The Horror Box"
            >
                <img
                    src={boxPhoto}
                    draggable="false"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-[58%_58%] transition-transform duration-700 select-none group-hover:scale-105"
                    alt=""
                    aria-hidden="true"
                />
                {/* Dark at both ends, photo showing through the middle: the type sits
                    left and the button right, so neither fights the image. */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.82)_35%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.85)_100%)]" />

                <div className="relative flex w-full flex-wrap items-center justify-between gap-4 px-6 md:px-10">
                    <div className="max-w-[34rem]">
                        <p className="text-accent text-[11px] font-bold tracking-[.2rem] uppercase">Signature instrument</p>
                        <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none font-bold uppercase italic">The Horror Box</h2>
                        <p className="text-secondary mt-2 max-w-[44ch] text-sm tracking-[0.04em]">
                            An acoustic instrument built by hand, so that dread can be brought to life by hand.
                        </p>
                    </div>
                    <span className="rounded-full bg-[#f3f3f4] px-6 py-2 text-sm font-bold tracking-widest text-black uppercase transition-colors group-hover:bg-black group-hover:text-[#f3f3f4] md:text-base">
                        play the box
                    </span>
                </div>
            </Link>
        </section>
    );
}
