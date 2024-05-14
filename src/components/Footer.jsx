import logoHorizontal from "../assets/images/footer/logo-horizontal.png";
import footerCheckers from "../assets/images/footer/checkersGraphic.png";

export default function Footer() {
    return (
        <footer className="flex items-center justify-between align-middle z-50 max-w-full">
            <div className="w-full px-2 md:w-[15%] md:px-7">
                <ul className="text-[.5em] md:text-base">
                    <li className="my-0 md:my-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-accent md:text-xl">
                            reach us
                        </p>
                    </li>
                    <li className="my-0 md:my-2">
                        <a
                            href="mailto:safeandsoundpost@gmail.com"
                            className="font-semibold tracking-widest text-primary"
                        >
                            Email
                        </a>
                    </li>
                    <li className="my-0 md:my-2">
                        <a
                            href="https://www.instagram.com/safeandsoundpost/"
                            className="font-semibold tracking-widest text-primary"
                            target="_blank"
                        >
                            Instagram
                        </a>
                    </li>
                    <li className="my-0 md:my-2">
                        <a
                            href="https://www.linkedin.com/company/safe-sound-post/"
                            className="font-semibold tracking-widest text-primary"
                            target="_blank"
                        >
                            Linkedin
                        </a>
                    </li>
                    <li className="my-0 md:my-2">
                        <a
                            href="https://wa.me/17783638396"
                            className="font-semibold tracking-widest text-primary"
                            target="_blank"
                        >
                            Whatsapp
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-5">
                <img
                    className="m-auto select-none max-md:w-10/12"
                    src={logoHorizontal}
                    draggable="false"
                />
                <p className="w-full text-center text-xs font-bold uppercase md:text-base">
                    &#64; safe &#38; sound {new Date(Date.now()).getFullYear()}
                </p>
            </div>
            <img className="h-full w-1/4 md:w-1/6" src={footerCheckers} />
        </footer>
    );
}
