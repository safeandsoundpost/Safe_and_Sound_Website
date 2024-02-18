// import { useLocation } from "react-router-dom";
import logo from "/images/logo.png";
import Link from "./Link";
import PropTypes from "prop-types";

export default function NavBar({ currentSection }) {
    // const { hash } = useLocation();
    // console.log(hash);

    return (
        <nav className="fixed z-10 m-3 mt-8 text-2xl font-bold text-primary">
            {/* hash: {hash} */}
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
                <li className="self-end">
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
                <li className="ml-10">
                    <Link
                        className="px-2 py-1 hover:border-secondary hover:text-secondary"
                        href="#awards"
                        currentSection={currentSection}
                    >
                        awards
                    </Link>
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
