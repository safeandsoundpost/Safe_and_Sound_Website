import logo from "/images/logo.png";
import logoMobile from "/images/logo-mobile.png";
// import logoCircle from "/images/ss-logo-circle.png";
import Link from "./Link";
import PropTypes from "prop-types";
import awardsSymbol from "../assets/images/symbols/awards-symbol.png";
import projectSymbol from "../assets/images/symbols/projects-star.png";
import burgerMenu from "../assets/icons/burger.svg";

export default function NavBar({ currentSection }) {
    return (
        <nav className="relative z-50 m-0 text-base font-bold text-primary max-md:drawer max-md:drawer-end md:drawer-open md:fixed md:m-3 md:mt-8">
            <input id="side-menu" type="checkbox" className="drawer-toggle" />

            <div className="fixed mx-auto flex w-full flex-row-reverse justify-between bg-black py-3 pl-3 md:hidden">
                <label
                    htmlFor="side-menu"
                    className="btn btn-ghost btn-primary drawer-button my-auto"
                >
                    <img src={burgerMenu} className="m-auto h-3/4" />
                </label>
                <img src={logoMobile} className="aspect-[10/2] h-12 w-fit" />
            </div>

            <div className="drawer-side md:h-[70vh] md:!overflow-hidden">
                <label
                    htmlFor="side-menu"
                    aria-label="close sidebar"
                    className="drawer-overlay md:hidden"
                ></label>
                <ul className="flex flex-col gap-3 tracking-widest max-md:h-full max-md:bg-black max-md:p-5">
                    <li className="h-22 select-none">
                        <img
                            className="h-48 md:h-36 lg:h-52" // aspect-square w-[299px] max-md:w-[200px]
                            src={logo}
                            alt="safe & sound logo"
                            draggable="false"
                        />
                    </li>
                    <li>
                        <Link
                            className="px-2 py-1 text-sm hover:border-secondary hover:text-secondary md:text-base lg:text-lg xl:text-xl"
                            href="#demo-reel"
                            defActive={true}
                            currentSection={currentSection}
                        >
                            demo reel
                        </Link>
                    </li>
                    <li className="flex w-3/4 items-center justify-between self-end">
                        <img
                            className="aspect-square h-[1.2em] md:h-[1.1em] lg:h-[1em]"
                            src={projectSymbol}
                        />
                        <Link
                            className="px-2 py-1 text-sm hover:border-secondary hover:text-secondary md:text-base lg:text-lg xl:text-xl"
                            href="#projects"
                            currentSection={currentSection}
                        >
                            projects
                        </Link>
                    </li>
                    <li className="ml-5">
                        <Link
                            className="px-2 py-1 text-sm hover:border-secondary hover:text-secondary md:text-base lg:text-lg xl:text-xl"
                            href="#services"
                            currentSection={currentSection}
                        >
                            services
                        </Link>
                    </li>
                    <li className="mr-2 self-end">
                        <Link
                            className="px-2 py-1 text-sm hover:border-secondary hover:text-secondary md:text-base lg:text-lg xl:text-xl"
                            href="#the-team"
                            currentSection={currentSection}
                        >
                            the team
                        </Link>
                    </li>
                    <li className="ml-10 flex items-center justify-between">
                        <Link
                            className="px-2 py-1 text-sm hover:border-secondary hover:text-secondary md:text-base lg:text-lg xl:text-xl"
                            href="#awards"
                            currentSection={currentSection}
                        >
                            awards
                        </Link>
                        <img
                            className="aspect-[2.3/1] h-[60%]"
                            src={awardsSymbol}
                        />
                    </li>
                    <li className="mr-4 self-end">
                        <Link
                            className="px-2 py-1 text-sm hover:border-secondary hover:text-secondary md:text-base lg:text-lg xl:text-xl"
                            href="#reviews"
                            currentSection={currentSection}
                        >
                            reviews
                        </Link>
                    </li>
                    <li className="ml-6">
                        <Link
                            className="px-2 py-1 text-sm hover:border-secondary hover:text-secondary md:text-base lg:text-lg xl:text-xl"
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
