import NavBar from "../components/NavBar";
import Projects from "../components/home/Projects";
import Services from "../components/home/Services";
import TheTeam from "../components/home/TheTeam";
import Banner from "./Banner";

export default function Home() {
    return (
        <main className="flex flex-col w-full overflow-x-hidden">
            <NavBar />
            <Banner />
            <section className="m-auto w-[65%]">
                <Projects />
                <Services />
                <TheTeam />
            </section>
        </main>
    );
}
