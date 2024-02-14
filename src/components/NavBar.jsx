import { useLocation } from "react-router-dom";
import logo from "/images/logo.png";
import Link from "./Link";

export default function NavBar() {
    const { hash } = useLocation();
    console.log(hash);

    return (
        <nav className="fixed z-10 text-2xl font-bold m-3 mt-8 text-primary">
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
                    >
                        demo reel
                    </Link>
                </li>
                <li className="self-end">
                    <Link
                        className="px-2 py-1 hover:border-secondary hover:text-secondary"
                        href="#projects"
                    >
                        projects
                    </Link>
                </li>
                <li className="ml-5">
                    <Link
                        className="px-2 py-1 hover:border-secondary hover:text-secondary"
                        href="#services"
                    >
                        services
                    </Link>
                </li>
                <li className="self-end mr-2">
                    <Link
                        className="px-2 py-1 hover:border-secondary hover:text-secondary"
                        href="#the-team"
                    >
                        the team
                    </Link>
                </li>
                <li className="ml-10">
                    <Link
                        className="px-2 py-1 hover:border-secondary hover:text-secondary"
                        href="#awards"
                    >
                        awards
                    </Link>
                </li>
                <li className="self-end mr-4">
                    <Link
                        className="px-2 py-1 hover:border-secondary hover:text-secondary"
                        href="#reviews"
                    >
                        reviews
                    </Link>
                </li>
                <li className="ml-6">
                    <Link
                        className="px-2 py-1 hover:border-secondary hover:text-secondary"
                        href="#contact"
                    >
                        contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
