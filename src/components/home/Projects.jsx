import { useEffect } from "react";
import { useState } from "react";

export default function Projects() {
    /**
     * @type {[Array<string>, import("react").Dispatch<import("react").SetStateAction<Array<string>>>]}
     */
    const [images, setImages] = useState([]);
    const quantity = 4;
    /**
     * @type {[number, import("react").Dispatch<import("react").SetStateAction<number>>]}
     */
    const [page, setPage] = useState(1);

    useEffect(() => {
        const img = Object.values(
            import.meta.glob("@projects/*.{png,jpg,jpeg,PNG,JPEG}", {
                eager: true,
                query: "?url",
            }),
        ).map((x) => x.default);
        console.log(img);
        setImages(img);
    }, []);

    const pageMove = (_amount) => {
        setPage((prev) => {
            const next = prev + _amount;
            if (next < 1 || next > Math.ceil(images.length / quantity)) {
                return prev;
            }
            return next;
        });
    };

    return (
        <section id="projects" className="w-full py-10">
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                Projects
            </h2>
            <div className="flex w-full items-center justify-center gap-5 align-middle">
                <button className="h-20 w-20" onClick={() => pageMove(-1)}>
                    <svg
                        className={`fill-primary hover:fill-secondary ${page === 1 ? "hidden" : ""}`}
                        width="100%"
                        height="100%"
                        viewBox="0 0 5 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5 0L0 5L5 10V0Z" />
                    </svg>
                </button>
                {images &&
                    (() => {
                        const startIndex = (page - 1) * quantity;
                        const endIndex = startIndex + quantity;
                        const displayedImages = images.slice(
                            startIndex,
                            endIndex,
                        );
                        return displayedImages.map((x, i) => (
                            <div
                                className="w-fit border-2 border-primary p-3"
                                key={i}
                            >
                                <img
                                    draggable="false"
                                    className="aspect-[12/16] h-[22rem] select-none w-fit object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                                    src={x}
                                    alt={`project-${i}`}
                                />
                            </div>
                        ));
                    })()}
                <button className="h-20 w-20" onClick={() => pageMove(1)}>
                    <svg
                        className={`fill-primary hover:fill-secondary ${page * quantity >= images.length ? "hidden" : ""}`}
                        width="100%"
                        height="100%"
                        viewBox="0 0 5 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 10L5 5L0 0V10Z" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
