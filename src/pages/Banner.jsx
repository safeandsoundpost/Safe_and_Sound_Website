import email from "/icons/email.svg";
import instagram from "/icons/instagram.svg";
import vimeo from "/icons/vimeo.svg";
import banner from "/images/banner.png";

export default function Banner() {
    return (
        <section
            id="demo-reel"
            className="h-2/5 max-h-[40%] min-h-[470px] w-full cursor-pointer bg-[#ffffff1f] bg-cover bg-left-top hover:bg-blend-color-burn"
            onClick={() => {}}
            style={{ backgroundImage: `url(${banner})` }}
        >
            {/* <div className="fixed flex min-h-[400px] w-full items-center justify-center align-middle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="h-24 w-h-24 text-white"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                    />
                </svg>
            </div> */}
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
        </section>
    );
}
