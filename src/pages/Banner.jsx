import email from "/icons/email.svg";
import instagram from "/icons/instagram.svg";
import vimeo from "/icons/vimeo.svg";
import banner from "/images/banner.png";

export default function Banner() {
    return (
        <div
            className="h-2/5 max-h-[40%] min-h-[400px] w-full bg-cover bg-left-top"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <div className="mt-5 flex h-12 w-[98%] justify-end gap-5">
                <a
                    className="h-full w-12 select-none"
                    href="https://www.instagram.com/safeandsoundpost/"
                    target="_blank"
                >
                    <img className="w-full" src={instagram} draggable="false" />
                </a>
                <a
                    className="h-full w-12 select-none"
                    href="mailto:safeandsoundpost@gmail.com"
                >
                    <img className="w-full" src={email} draggable="false" />
                </a>
                <a
                    className="h-full w-12 select-none"
                    href="https://vimeo.com/839330843"
                    target="_blank"
                >
                    <img className="w-full" src={vimeo} draggable="false" />
                </a>
            </div>
        </div>
    );
}
