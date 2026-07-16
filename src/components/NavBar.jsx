import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { RiVimeoLine } from "react-icons/ri";
import logoHorizontal from "../assets/images/footer/logo-horizontal.png";
import burgerMenu from "../assets/icons/burger.svg";

const NAV_LINKS = [
    { to: "/", label: "home" },
    { to: "/projects", label: "projects" },
    { to: "/services", label: "services" },
    { to: "/team", label: "the team" },
    { to: "/clients", label: "clients" },
    { to: "/reviews", label: "reviews" },
    { to: "/contact", label: "contact us" },
];

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // On the home page the header waits for the sizzle reel's first frame
    // (Banner dispatches "sizzle-live"), then fades in with the banner UI.
    const [revealed, setRevealed] = useState(false);
    const { pathname } = useLocation();
    // Only the home page has the full-screen video to overlay; every other
    // page gets a solid header from the start.
    const solid = scrolled || menuOpen || pathname !== "/";
    const visible = revealed || pathname !== "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (revealed) return;
        const reveal = () => setRevealed(true);
        window.addEventListener("sizzle-live", reveal, { once: true });
        const fallback = setTimeout(reveal, 3500);
        return () => {
            window.removeEventListener("sizzle-live", reveal);
            clearTimeout(fallback);
        };
    }, [revealed]);

    const linkClass = (extra) =>
        ({ isActive }) =>
            `w-fit border-2 uppercase ${isActive ? "border-primary" : "border-transparent"} hover:border-secondary hover:text-secondary ${extra}`;

    return (
        <header
            className={`fixed top-0 left-0 z-[60] w-full transition-[background-color,opacity] duration-300 ${
                solid ? "bg-black/95 shadow-lg shadow-black/50" : "bg-transparent"
            } ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
            <div className="relative mx-auto flex w-full flex-col items-center px-4 py-3 md:py-4">
                <NavLink to="/" className="block select-none" onClick={() => setMenuOpen(false)}>
                    <img
                        className={`h-auto w-auto max-w-[70vw] object-contain transition-all duration-300 md:max-w-none ${scrolled ? "max-h-10 md:max-h-12" : "max-h-14 md:max-h-16"}`}
                        src={logoHorizontal}
                        alt="Safe and Sound logo"
                        draggable="false"
                    />
                </NavLink>

                {/* Desktop nav */}
                <nav className="text-primary mt-3 hidden font-bold tracking-widest md:block">
                    <ul className="flex flex-row items-center justify-center gap-1 lg:gap-4">
                        {NAV_LINKS.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink className={linkClass("px-2 py-1 text-[clamp(0.7rem,0.95vw,1.05rem)] whitespace-nowrap")} to={to}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Social links */}
                <div className="absolute top-6 right-5 hidden gap-4 md:flex">
                    <a
                        className="text-primary hover:text-secondary h-7 w-7 transition-colors select-none"
                        href="https://www.instagram.com/safeandsoundpost/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <BsInstagram className="size-full" />
                    </a>
                    <a
                        className="text-primary hover:text-secondary h-7 w-7 transition-colors select-none"
                        href="mailto:safeandsoundpost@gmail.com"
                        aria-label="Email"
                    >
                        <MdOutlineEmail className="size-full" />
                    </a>
                    <a
                        className="text-primary hover:text-secondary h-7 w-7 transition-colors select-none"
                        href="https://vimeo.com/user214948086"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Vimeo"
                    >
                        <RiVimeoLine className="size-full" />
                    </a>
                </div>

                {/* Mobile burger */}
                <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 p-2 md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <img src={burgerMenu} className="h-6 w-6" alt="" />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <nav className="text-primary border-t border-white/10 bg-black/95 pb-4 font-bold tracking-widest md:hidden">
                    <ul className="flex flex-col items-center gap-4 pt-5 pb-2">
                        {NAV_LINKS.map(({ to, label }) => (
                            <li key={to} onClick={() => setMenuOpen(false)}>
                                <NavLink className={linkClass("px-3 py-1.5 text-lg")} to={to}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
