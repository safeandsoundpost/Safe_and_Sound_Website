import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Awards from "../components/home/Awards";
import Projects from "../components/home/Projects";
import Reviews from "../components/home/Reviews";
import Services from "../components/home/Services";
import TheTeam from "../components/home/TheTeam";
import Banner from "./Banner";
import Contact from "../components/home/Contact";
import CookieBanner from "../components/CookieBanner";

export default function Home() {
    const [currentSection, setCurrentSection] = useState("");

    useEffect(() => {
        const headings = Array.from(
            document.querySelectorAll("main section[id]"),
        );
        const scrollCallback = () => {
            const visible_content = headings.filter((x) => {
                const rect = x.getBoundingClientRect();
                return rect.height - rect.height * 0.5 + rect.top > 0;
            });
            const first = visible_content[0];

            if (!first) return;
            setCurrentSection(first.id);
        };
        document.addEventListener("scroll", scrollCallback, true);
        return () =>
            document.removeEventListener("scroll", scrollCallback, true);
    }, []);

    return (
        <>
            <main className="flex w-full select-none flex-col">
                <CookieBanner />
                <NavBar currentSection={currentSection} />
                <Banner />
                <section className="m-auto w-[85%] md:ml-auto md:mr-[8%] md:w-[70%] lg:m-auto lg:w-[65%]">
                    <Projects />
                    <Services />
                    <TheTeam />
                    <Awards />
                    <Reviews />
                    <Contact />
                </section>
            </main>
            <Footer />
        </>
    );
}
