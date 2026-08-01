import { useEffect } from "react";

export const SITE_NAME = "Safe & Sound Post";
export const SITE_URL = "https://safeandsoundpost.com";

const DEFAULT_IMAGE = `${SITE_URL}/images/banner-loveme.jpg`;

// index.html ships a default set of head tags. These helpers update those tags
// in place when they exist so a route change never leaves two of the same tag
// behind, and create them only when they are genuinely missing.
function setMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function setCanonical(href) {
    let el = document.head.querySelector("link[rel='canonical']");
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
}

// Points the per-page title, description and canonical at the current route.
// Without this every route served the homepage's tags, so Google treated the
// section pages as duplicates of "/" and rewrote their titles.
export function useSeo({ title, description, path, image = DEFAULT_IMAGE, noindex = false }) {
    useEffect(() => {
        const url = `${SITE_URL}${path}`;

        document.title = title;
        setMeta("name", "description", description);
        setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
        setCanonical(url);

        setMeta("property", "og:title", title);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", url);
        setMeta("property", "og:image", image);

        setMeta("name", "twitter:title", title);
        setMeta("name", "twitter:description", description);
        setMeta("name", "twitter:image", image);
    }, [title, description, path, image, noindex]);
}

// Every static route. Kept beside the sitemap route list in vite.config.js.
export const PAGE_SEO = {
    home: {
        title: "Safe & Sound Post | Audio Post-Production | Toronto",
        description: "Full Service Audio Post-Production Collective supporting creativity | empowering filmmakers | always looking forward.",
        path: "/",
    },
    projects: {
        title: "Projects | Safe & Sound Post",
        description: "Feature films, series and shorts mixed, edited and sound designed by Safe & Sound Post, a Toronto audio post-production collective.",
        path: "/projects",
    },
    services: {
        title: "Services | Safe & Sound Post",
        description: "ADR, VO recording, dialogue editing, sound design, foley and re-recording mixing from a full service Toronto audio post-production collective.",
        path: "/services",
    },
    team: {
        title: "The Team | Safe & Sound Post",
        description: "Meet the sound supervisors, designers, editors and re-recording mixers behind Safe & Sound Post in Toronto.",
        path: "/team",
    },
    clients: {
        title: "Clients | Safe & Sound Post",
        description: "The studios, networks and independent filmmakers who trust Safe & Sound Post with their audio post-production.",
        path: "/clients",
    },
    reviews: {
        title: "Reviews | Safe & Sound Post",
        description: "What directors, producers and filmmakers say about working with Safe & Sound Post on their audio post-production.",
        path: "/reviews",
    },
    contact: {
        title: "Contact | Safe & Sound Post",
        description: "Get in touch with Safe & Sound Post about audio post-production for your film, series or short. Based in Toronto, working with filmmakers anywhere.",
        path: "/contact",
    },
    blog: {
        title: "Behind the Scenes | Safe & Sound Post",
        description: "Notes, breakdowns and behind the scenes stories from the audio team at Safe & Sound Post in Toronto.",
        path: "/blog",
    },
    horrorBox: {
        title: "Horror Box | Safe & Sound Post",
        description: "An interactive horror sound toy built by Safe & Sound Post. Trigger stings, scares and atmospheres straight from your browser.",
        path: "/horror-box",
    },
    notFound: {
        title: "Page Not Found | Safe & Sound Post",
        description: "That page does not exist. Head back to Safe & Sound Post, a full service audio post-production collective in Toronto.",
        path: "/404",
        noindex: true,
    },
};
