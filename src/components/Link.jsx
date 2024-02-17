import PropTypes from "prop-types";
// import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Link({ className, href, children, defActive }) {
    const location = useLocation();
    // const nav = useNavigate();
    let active = location.hash === href;
    if (defActive && !active && !location.hash) active = true;

    // console.log(nav);
    // useEffect(() => {
    //     // const el = document.querySelector(href);
    //     // if (active && el) {
    //     //     el.scrollIntoView({ behavior: "smooth" });
    //     // }
    //     console.log(history);
    // }, [history]);

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
