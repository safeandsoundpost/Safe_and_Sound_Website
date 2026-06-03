import logoHorizontal from "../assets/images/footer/logo-horizontal.png";
import footerCheckers from "../assets/images/footer/checkersGraphic.png";

export default function Footer() {
    return (
        <footer className="relative z-50 flex max-w-full items-center justify-between pb-3 align-middle select-none">
            <div className="w-full px-2 md:w-[15%] md:px-7">
                <ul className="text-[.5em] md:text-base">
                    <li className="my-0 md:my-2">
                        <p className="text-accent text-xs font-bold tracking-widest uppercase md:text-xl">reach us</p>
                    </li>
                    <li className="my-0 md:my-2">
                        <a href="mailto:safeandsoundpost@gmail.com" className="link-hover text-primary font-semibold tracking-widest">
                            Email
                        </a>
                    </li>
                    <li className="my-0 md:my-2">
                        <a href="https://www.instagram.com/safeandsoundpost/" className="link-hover text-primary font-semibold tracking-widest" target="_blank">
                            Instagram
                        </a>
                    </li>
                    <li className="my-0 md:my-2">
                        <a
                            href="https://www.linkedin.com/company/safe-sound-post/"
                            className="link-hover text-primary font-semibold tracking-widest"
                            target="_blank"
                        >
                            Linkedin
                        </a>
                    </li>
                    <li className="my-0 md:my-2">
                        <a href="https://wa.me/17783638396" className="link-hover text-primary font-semibold tracking-widest" target="_blank">
                            Whatsapp
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-5">
                <img className="m-auto select-none max-md:w-10/12" src={logoHorizontal} draggable="false" alt="Safe and Sound logo - Horizontal version" />
                <p className="w-full text-center text-xs font-bold uppercase md:text-base">&#64; safe &#38; sound {new Date(Date.now()).getFullYear()}</p>
                <div className="flex flex-col gap-2">
                    <p className="w-full text-center text-xs font-bold md:text-base">
                        Website Design by:{" "}
                        <a className="link link-secondary link-hover" href="https://www.maxinelemieux.com/">
                            Maxine Lemieux
                        </a>
                    </p>
                    <p className="w-full text-center text-xs font-bold md:text-base">
                        Website Build by:{" "}
                        <a className="link link-secondary link-hover" href="https://www.bruno-ramirez.com/">
                            Bruno Ramirez
                        </a>
                    </p>
                </div>
            </div>
            <img className="h-full w-1/4 md:w-1/6" src={footerCheckers} alt="Footer decorator" />
        </footer>
    );
}
