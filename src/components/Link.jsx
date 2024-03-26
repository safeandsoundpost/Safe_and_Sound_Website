import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Link({ currentSection, className, href, children, defActive }) {
    const location = useLocation();
    const [active, setActive] = useState(location.hash === href);

    useEffect(() => {
        if (defActive && !currentSection) setActive(true);
        if (!currentSection) return;

        setActive(`#${currentSection}` === href);
    }, [currentSection, href, defActive]);

    return (
        <a
            className={`${className} w-fit uppercase border-2 ${active ? "border-primary" : "border-transparent"}`}
            href={href}
        >
            {children}
        </a>
    );
}

Link.propTypes = {
    currentSection: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defActive: PropTypes.bool,
};