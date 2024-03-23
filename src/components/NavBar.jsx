// import { useLocation } from "react-router-dom";
import logo from "/images/logo.png";
import logoMobile from "/images/logo-mobile.png";
import Link from "./Link";
import PropTypes from "prop-types";
import awardsSymbol from "../assets/images/symbols/awards-symbol.png";
import projectSymbol from "../assets/images/symbols/projects-star.png";
import burgerMenu from "../assets/icons/burger.svg";

export default function NavBar({ currentSection }) {
    return (
        <nav className="max-md:drawer relative z-50 m-0 text-2xl font-bold text-primary md:drawer-open md:fixed md:m-3 md:mt-8">
            <input id="side-menu" type="checkbox" className="drawer-toggle" />
            <div className="max-md:drawer-content my-3 mx-2 flex flex-row-reverse justify-between md:hidden">
                <label
                    htmlFor="side-menu"
                    className="btn btn-ghost btn-primary drawer-button my-auto"
                >
                    <img src={burgerMenu} className="h-3/4 m-auto" />
                </label>
                <img src={logoMobile} className="h-12 aspect-[10/3] w-3/4" />
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="side-menu"
                    aria-label="close sidebar"
                    className="drawer-overlay md:hidden"
                ></label>
                <ul className="flex flex-col gap-2 tracking-widest">
                    <li className="select-none">
                        <img
                            src={logo}
                            alt="safe & sound logo"
                            draggable="false"
                        />
                    </li>
                    <li>
                        <Link
                            className="px-2 py-1 hover:border-secondary hover:text-secondary"
                            href="#demo-reel"
                            defActive={true}
                            currentSection={currentSection}
                        >
                            demo reel
                        </Link>
                    </li>
                    <li className="flex w-3/4 items-center justify-between self-end">
                        <img
                            className="aspect-square h-fit"
                            src={projectSymbol}
                        />
                        <Link
                            className="px-2 py-1 hover:border-secondary hover:text-secondary"
                            href="#projects"
                            currentSection={currentSection}
                        >
                            projects
                        </Link>
                    </li>
                    <li className="ml-5">
                        <Link
                            className="px-2 py-1 hover:border-secondary hover:text-secondary"
                            href="#services"
                            currentSection={currentSection}
                        >
                            services
                        </Link>
                    </li>
                    <li className="mr-2 self-end">
                        <Link
                            className="px-2 py-1 hover:border-secondary hover:text-secondary"
                            href="#the-team"
                            currentSection={currentSection}
                        >
                            the team
                        </Link>
                    </li>
                    <li className="ml-10 flex items-center justify-between">
                        <Link
                            className="px-2 py-1 hover:border-secondary hover:text-secondary"
                            href="#awards"
                            currentSection={currentSection}
                        >
                            awards
                        </Link>
                        <img className="h-[1.2em] w-fit" src={awardsSymbol} />
                    </li>
                    <li className="mr-4 self-end">
                        <Link
                            className="px-2 py-1 hover:border-secondary hover:text-secondary"
                            href="#reviews"
                            currentSection={currentSection}
                        >
                            reviews
                        </Link>
                    </li>
                    <li className="ml-6">
                        <Link
                            className="px-2 py-1 hover:border-secondary hover:text-secondary"
                            href="#contact"
                            currentSection={currentSection}
                        >
                            contact
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
