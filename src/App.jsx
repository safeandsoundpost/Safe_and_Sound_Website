import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SectionPage from "./components/SectionPage";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import HorrorSoundBox from "./pages/HorrorSoundBox";
import Projects from "./components/home/Projects";
import Services from "./components/home/Services";
import TheTeam from "./components/home/TheTeam";
import Clients from "./components/home/Clients";
import Reviews from "./components/home/Reviews";
import Contact from "./components/home/Contact";

function App() {
    return (
        <>
            <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
                <defs>
                    <filter id="film-grain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="0" stitchTiles="stitch" result="noise" />
                        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                        <feComponentTransfer in="grayNoise" result="fadedNoise">
                            <feFuncR type="linear" slope="0.12" intercept="0.44" />
                            <feFuncG type="linear" slope="0.12" intercept="0.44" />
                            <feFuncB type="linear" slope="0.12" intercept="0.44" />
                        </feComponentTransfer>
                        <feBlend in="SourceGraphic" in2="fadedNoise" mode="overlay" result="blended" />
                        <feColorMatrix type="saturate" values="0" in="blended" />
                    </filter>
                </defs>
            </svg>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/projects"
                            element={
                                <SectionPage>
                                    <Projects />
                                </SectionPage>
                            }
                        />
                        <Route
                            path="/services"
                            element={
                                <SectionPage>
                                    <Services />
                                </SectionPage>
                            }
                        />
                        <Route
                            path="/team"
                            element={
                                <SectionPage>
                                    <TheTeam />
                                </SectionPage>
                            }
                        />
                        <Route
                            path="/clients"
                            element={
                                <SectionPage>
                                    <Clients />
                                </SectionPage>
                            }
                        />
                        <Route
                            path="/reviews"
                            element={
                                <SectionPage>
                                    <Reviews />
                                </SectionPage>
                            }
                        />
                        <Route
                            path="/contact"
                            element={
                                <SectionPage>
                                    <Contact />
                                </SectionPage>
                            }
                        />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/horror-box" element={<HorrorSoundBox />} />
                        <Route path="*" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
