import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function Link({ className, href, children, defActive }) {
    const { hash } = useLocation();
    let active = hash === href;
    if (defActive && !active && !hash) active = true;

    return (
        <a
            className={`${className} uppercase w-fit ${active ? "border-2 border-primary" : ""}`}
            href={href}
        >
            {children}
        </a>
    );
}

Link.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defActive: PropTypes.bool,
};
