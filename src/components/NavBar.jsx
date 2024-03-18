// import { useLocation } from "react-router-dom";
import logo from "/images/logo.png";
import Link from "./Link";
import PropTypes from "prop-types";
import awardsSymbol from "../assets/images/symbols/awards-symbol.png";
import projectSymbol from "../assets/images/symbols/projects-star.png";

export default function NavBar({ currentSection }) {
    return (
        <nav className="fixed z-50 m-3 mt-8 text-2xl font-bold text-primary">
            <ul className="flex flex-col gap-2 tracking-widest">
                <li className="select-none">
                    <img src={logo} alt="safe & sound logo" draggable="false" />
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
                <li className="self-end flex justify-between items-center w-3/4">
                    <img className="aspect-square h-fit" src={projectSymbol} />
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
                <li className="ml-10 flex justify-between items-center">
                    <Link
                        className="px-2 py-1 hover:border-secondary hover:text-secondary"
                        href="#awards"
                        currentSection={currentSection}
                    >
                        awards
                    </Link>
                    <img className="w-fit h-[1.2em]" src={awardsSymbol} />
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
        </nav>
    );
}

NavBar.propTypes = {
    currentSection: PropTypes.string,
};
