import logoHorizontal from "../assets/images/footer/logo-horizontal.png";
import footerCheckers from "../assets/images/footer/checkersGraphic.png";

export default function Footer() {
    return (
        <footer className="flex items-center justify-between align-middle">
            <div className="w-[15%] px-7">
                <ul>
                    <li className="my-2">
                        <p className="text-xl font-bold uppercase tracking-widest text-accent">
                            reach us
                        </p>
                    </li>
                    <li className="my-2">
                        <a
                            href="mailto:safeandsoundpost@gmail.com"
                            className="font-semibold tracking-widest text-primary"
                        >
                            Email
                        </a>
                    </li>
                    <li className="my-2">
                        <a
                            href="https://www.instagram.com/safeandsoundpost/"
                            className="font-semibold tracking-widest text-primary"
                            target="_blank"
                        >
                            Instagram
                        </a>
                    </li>
                    <li className="my-2">
                        <a
                            href="https://www.linkedin.com/company/safe-sound-post/"
                            className="font-semibold tracking-widest text-primary"
                            target="_blank"
                        >
                            Linkedin
                        </a>
                    </li>
                    <li className="my-2">
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
                    className="select-none"
                    src={logoHorizontal}
                    draggable="false"
                />
                <p className="w-full text-center font-bold uppercase">
                    &#64; safe &#38; sound 2023
                </p>
            </div>
            <img src={footerCheckers} />
        </footer>
    );
}
