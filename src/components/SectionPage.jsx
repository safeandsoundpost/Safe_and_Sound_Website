import PropTypes from "prop-types";

// Shared wrapper for the standalone section pages: centers the content and
// clears the fixed header.
export default function SectionPage({ children }) {
    return <main className="m-auto min-h-screen w-11/12 pt-28 pb-10 select-none md:pt-40 lg:w-3/4 xl:w-[65%]">{children}</main>;
}

SectionPage.propTypes = {
    children: PropTypes.node.isRequired,
};
