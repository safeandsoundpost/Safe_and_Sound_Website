import PropTypes from "prop-types";
import { useSeo } from "../utils/seo";

// Shared wrapper for the standalone section pages: centers the content and
// clears the fixed header. Also owns the page's head tags, since the section
// components themselves are reused inside Home and must not set them there.
export default function SectionPage({ children, seo }) {
    useSeo(seo);

    return <main className="m-auto min-h-screen w-11/12 pt-28 pb-10 select-none md:pt-40 lg:w-3/4 xl:w-[65%]">{children}</main>;
}

SectionPage.propTypes = {
    children: PropTypes.node.isRequired,
    seo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    }).isRequired,
};
