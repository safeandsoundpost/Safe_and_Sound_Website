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
            <div className="fixed bottom-0 z-[500] mb-5 w-full bg-transparent duration-1000 animate-in slide-in-from-bottom-40">
                <div
                    role="alert"
                    className="alert m-auto mt-3 w-9/12 origin-top-right border-2 border-white"
                >
                    <MdCookie className="size-7" />
                    <span className="text-white">
                        We use cookies to ensure and improve the user experience
                        in our website.
                    </span>
                    <div className="flex gap-3">
                        <button
                            name="Deny cookies"
                            className="btn btn-outline btn-sm text-white"
                            onClick={() => setShowCookieBanner(false)}
                        >
                            Deny
                        </button>
                        <button
                            name="Accept cookies"
                            className="btn btn-primary btn-sm"
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
