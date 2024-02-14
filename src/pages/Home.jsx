import NavBar from "../components/NavBar";
import Projects from "../components/home/Projects";
import Banner from "./Banner";

export default function Home() {
    return (
        <main className="flex flex-col">
            <NavBar />
            <Banner />
            <Projects />
        </main>
    );
}
