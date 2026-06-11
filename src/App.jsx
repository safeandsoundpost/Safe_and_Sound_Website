import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

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
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
