import { Link } from "react-router-dom";
import { useSeo, PAGE_SEO } from "../utils/seo";

export default function NotFound() {
    useSeo(PAGE_SEO.notFound);

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center px-6 text-center select-none">
            <p className="text-secondary text-sm tracking-widest uppercase">404</p>
            <h1 className="text-primary mt-4 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none font-bold uppercase italic">Page Not Found</h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-400">
                That page has moved or never existed. The work is all still here.
            </p>
            <Link to="/" className="text-secondary mt-8 text-sm tracking-widest uppercase transition-opacity hover:opacity-70">
                Back to Home
            </Link>
        </main>
    );
}
