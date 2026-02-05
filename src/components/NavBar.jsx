import logo from "/images/logo.png";
import logoMobile from "/images/logo-mobile.png";
import Link from "./Link";
import PropTypes from "prop-types";
import awardsSymbol from "../assets/images/symbols/awards-symbol.png";
import projectSymbol from "../assets/images/symbols/projects-star.png";
import { RiStarFill } from "react-icons/ri";
import burgerMenu from "../assets/icons/burger.svg";

export default function NavBar({ currentSection }) {
    return (
        <nav className="text-primary max-md:drawer max-md:drawer-end md:drawer-open relative z-[60] m-0 text-base font-bold md:fixed md:m-3 md:mt-8">
            <input id="side-menu" type="checkbox" className="drawer-toggle" />

            <div className="fixed mx-auto flex h-20 w-full flex-row-reverse items-center justify-between bg-black pl-3 align-middle md:hidden">
                <label htmlFor="side-menu" className="btn btn-ghost btn-primary drawer-button my-auto">
                    <img src={burgerMenu} className="m-auto h-3/4" alt="Burger menu icon" />
                </label>
                <div className="max-w-72 basis-8/12">
                    <img src={logoMobile} className="block h-auto max-h-12 w-full max-w-fit" alt="Safe and Sound logo - Mobile version" />
                </div>
            </div>

            <div className="drawer-side md:h-[100vh] md:overflow-hidden! lg:pb-2 lg:h-fit lg:max-h-fit">
                <label htmlFor="side-menu" aria-label="close sidebar" className="drawer-overlay md:hidden"></label>
                <ul className="flex flex-col gap-5 tracking-widest max-md:h-full max-md:bg-black max-md:p-5 md:gap-5">
                    <li className="h-fit py-1.5 select-none">
                        <img className="h-48 md:h-36 lg:h-52" src={logo} alt="safe & sound logo" draggable="false" />
                    </li>
                    <li>
                        <Link
                            className="hover:border-secondary hover:text-secondary px-2 py-2 text-sm md:text-base lg:text-lg xl:text-xl"
                            href="#demo-reel"
                            defActive={true}
                            currentSection={currentSection}
                        >
                            demo reel
                        </Link>
                    </li>
                    <li className="flex max-h-8 min-h-8 w-3/4 content-center items-center justify-end gap-2 self-end align-middle">
                        <Link
                            className="hover:border-secondary hover:text-secondary hover:stroke-secondary flex items-center justify-center gap-2 px-2 py-2 align-middle text-sm md:text-base lg:text-lg xl:text-xl"
                            href="#projects"
                            currentSection={currentSection}
                        >
                            <RiStarFill
                                className={`hover:stroke-secondary size-5 stroke-2 transition-all md:size-6 ${currentSection == "projects" ? "fill-secondary stroke-secondary rotate-12" : "fill-transparent stroke-white"}`}
                            />
                            projects
                        </Link>
                    </li>
                    <li className="ml-5 flex max-h-8 min-h-8 items-center">
                        <Link
                            className="hover:border-secondary hover:text-secondary px-2 py-2 text-sm md:text-base lg:text-lg xl:text-xl"
                            href="#services"
                            currentSection={currentSection}
                        >
                            services
                        </Link>
                    </li>
                    <li className="mr-2 flex max-h-8 min-h-8 items-center self-end">
                        <Link
                            className="hover:border-secondary hover:text-secondary px-2 py-2 text-sm md:text-base lg:text-lg xl:text-xl"
                            href="#the-team"
                            currentSection={currentSection}
                        >
                            the team
                        </Link>
                    </li>
                    <li className="mr-2 flex max-h-8 min-h-8 items-center">
                        <Link
                            className="hover:border-secondary hover:text-secondary px-2 py-2 text-sm md:text-base lg:text-lg xl:text-xl"
                            href="#clients"
                            currentSection={currentSection}
                        >
                            Clients
                        </Link>
                    </li>
                    <li className="ml-10 flex max-h-8 min-h-8 items-center justify-start gap-2">
                        <Link
                            className="hover:border-secondary hover:text-secondary flex items-center justify-center gap-3 px-2 py-2 align-middle text-sm md:text-base lg:text-lg xl:text-xl"
                            href="#awards"
                            currentSection={currentSection}
                        >
                            awards
                            <img className="h-5 md:h-6" src={awardsSymbol} alt="Awards decorator" />
                        </Link>
                    </li>
                    <li className="mr-4 flex max-h-8 min-h-8 items-center">
                        <Link
                            className="hover:border-secondary hover:text-secondary px-2 py-2 text-sm md:text-base lg:text-lg xl:text-xl"
                            href="#reviews"
                            currentSection={currentSection}
                        >
                            reviews
                        </Link>
                    </li>
                    <li className="ml-6 flex max-h-8 min-h-8 items-center">
                        <Link
                            className="hover:border-secondary hover:text-secondary px-2 py-2 text-sm md:text-base lg:text-lg xl:text-xl"
                            href="#contact"
                            currentSection={currentSection}
                        >
                            contact us
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    currentSection: PropTypes.string,
};
