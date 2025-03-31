import { useEffect, useState } from "react";
import { MdCookie } from "react-icons/md";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default function CookieBanner() {
    const [showCookieBanner, setShowCookieBanner] = useState(true);

    useEffect(() => {
        const acceptCookie = getCookie("accept-cookies");
        if (!acceptCookie) return;
        setShowCookieBanner(false);
    }, []);

    return (
        showCookieBanner && (
            <div className="animate-in slide-in-from-bottom-40 fixed bottom-0 z-500 mb-5 w-full bg-transparent duration-1000">
                <div
                    role="alert"
                    className="alert m-auto mt-3 flex w-9/12 origin-top-right flex-col justify-between gap-5 border-2 border-white md:flex-row"
                >
                    <div className="inline-flex flex-col items-center justify-center gap-5 md:flex-row">
                        <MdCookie className="size-10" />
                        <span className="text-center text-white md:text-left">
                            We use cookies to ensure and improve the user
                            experience in our website.
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button
                            name="Deny cookies"
                            className="btn btn-outline btn-sm h-8 px-8 text-white md:h-10"
                            onClick={() => setShowCookieBanner(false)}
                        >
                            Deny
                        </button>
                        <button
                            name="Accept cookies"
                            className="btn btn-primary btn-sm h-8 px-8 md:h-10"
                            onClick={() => {
                                document.cookie = "accept-cookies=true;path=/";
                                setShowCookieBanner(false);
                            }}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
