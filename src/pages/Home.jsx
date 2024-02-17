// import { useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Awards from "../components/home/Awards";
import Projects from "../components/home/Projects";
import Reviews from "../components/home/Reviews";
import Services from "../components/home/Services";
import TheTeam from "../components/home/TheTeam";
import Banner from "./Banner";

export default function Home() {
    // useEffect(() => {
    //     // window.addEventListener("load", () => {
    //     //     const headings = document.querySelectorAll("h1 a[name]");
    //     // });
    //     const headings = document.querySelectorAll("main section[id]");
    //     // console.log(headings);
    //     document.addEventListener(
    //         "scroll",
    //         () => {
    //             // console.log("scrolling");
    //             headings.forEach((ha) => {
    //                 const rect = ha.getBoundingClientRect();
    //                 // if (rect.top > 0) console.log(ha.id);
    //                 if (rect.top > 0 && rect.top < 150) {
    //                     const location = window.location.toString().split("#")[0];
    //                     history.replaceState(null, null, location + "#" + ha.id);
    //                 }
    //             });
    //         },
    //         true,
    //     );
    // }, []);

    return (
        <main className="flex w-full flex-col">
            <NavBar />
            <Banner />
            <section className="m-auto w-[65%]">
                <Projects />
                <Services />
                <TheTeam />
                <Awards />
                <Reviews />
            </section>
            <Footer />
        </main>
    );
}
