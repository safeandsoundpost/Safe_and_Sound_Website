import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
import oldContactForm from "../../assets/images/contact/contact-form.png";
import contactForm from "../../assets/images/contact/new-contact-form.png";
import { useSearchParams } from "react-router-dom";

export default function Contact() {
    const [urlParams] = useSearchParams();

    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [, setIsSubmitted] = useState(false);

    const [emailCopied, setEmailCopied] = useState(false);
    const copiedTimer = useRef(null);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText("info@safeandsoundpost.com");
            setEmailCopied(true);
            clearTimeout(copiedTimer.current);
            copiedTimer.current = setTimeout(() => setEmailCopied(false), 2000);
        } catch {
            /* clipboard unavailable (e.g. non-secure context) — leave the mailto link */
        }
    };

    useEffect(() => () => clearTimeout(copiedTimer.current), []);

    const submitForm = () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }

        if (!subject) {
            alert("Please enter a subject");
            return;
        }

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
            alert("Please enter a valid email");
            return;
        }

        if (!message) {
            alert("Please enter your message");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            emailjs
                .send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    {
                        from_name: subject,
                        from_email: email,
                        message: message,
                    },
                    {
                        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                    },
                )
                .then(() => {
                    setIsLoading(false);
                    alert("Your message has been sent successfully!");
                    setSubject("");
                    setEmail("");
                    setMessage("");
                    setIsSubmitted(true);
                })
                .catch((ex) => {
                    console.error(ex);
                    alert("An error occurred while sending the email, please try again later.");
                });
        }, 3000);
    };

    useEffect(() => setSubject(urlParams.get("subject") ?? ""), [urlParams]);

    return (
        <section id="contact" className="relative my-16 flex w-full flex-col items-center justify-center gap-10 pb-28 align-middle">
            <div
                className="relative z-20 flex aspect-[1.5/1] h-full w-full bg-contain bg-center bg-no-repeat align-middle text-xs font-semibold text-black max-md:text-[0.65rem] sm:text-lg md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl"
                style={{ backgroundImage: `url(${contactForm})` }}
            >
                <div className="m-auto flex h-full w-9/12 flex-col pb-2 md:w-6/12">
                    <div className="my-auto flex h-10/12 flex-col items-center justify-center gap-2 max-md:gap-1">
                        <label htmlFor="email" className="flex w-full flex-col items-center text-center tracking-[.2rem] uppercase">
                            email
                            <span className="w-4/12 border-b-2 border-black text-center md:border-b-4" />
                            <input
                                id="email"
                                name="email"
                                className="bg-primary mt-2 w-full rounded-xl text-center tracking-widest uppercase placeholder:text-gray-600 max-md:mt-1 md:mt-3"
                                type="email"
                                autoComplete="on"
                                value={email}
                                onInput={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label htmlFor="subject" className="flex w-full flex-col items-center text-center tracking-[.2rem] uppercase">
                            subject line
                            <span className="w-4/12 border-b-2 border-black text-center md:border-b-4" />
                            <textarea
                                id="subject"
                                name="subject"
                                rows={2}
                                className="bg-primary mt-2 w-full resize-none rounded-xl py-2 text-center text-xs tracking-widest text-info uppercase placeholder:text-gray-600 max-md:mt-1 max-md:py-1 max-md:text-[0.6rem] md:mt-3 md:text-sm"
                                value={subject}
                                onInput={(e) => setSubject(e.target.value)}
                                onFocus={(e) => {
                                    const idx = e.target.value.indexOf("PROJECT TITLE");
                                    if (idx !== -1) {
                                        e.target.setSelectionRange(idx, idx + "PROJECT TITLE".length);
                                    }
                                }}
                            />
                        </label>

                        <label htmlFor="message" className="flex h-full w-full grow flex-col items-center text-center tracking-[.2rem] uppercase">
                            what can we help you with?
                            <span className="w-4/12 border-b-2 border-black text-center md:border-b-4" />
                            <textarea
                                id="message"
                                name="message"
                                className="bg-primary mt-2 box-border h-full w-full grow resize-none rounded-xl py-1 text-center text-xs tracking-widest placeholder:text-gray-600 max-md:mt-1 max-md:min-h-12 max-md:text-[0.6rem] sm:text-xs md:mt-3 md:text-xs md:leading-[1.2rem] lg:text-base lg:leading-[2.3rem] xl:text-lg"
                                value={message}
                                onInput={(e) => setMessage(e.target.value)}
                            />
                        </label>

                        <div className="m-auto flex h-fit w-2/4 justify-center p-0 md:px-2 md:py-0.5 lg:px-4 lg:py-1">
                            <button
                                className="btn btn-info btn-xs md:btn-sm lg:btn-lg z-30 h-full w-full self-end border-0 p-0 tracking-[.2em] uppercase md:h-10"
                                onClick={submitForm}
                                name="Submit contact form"
                            >
                                {isLoading && <span className="loading loading-spinner loading-md"></span>}
                                submit
                            </button>
                        </div>
                        <p className="flex items-center justify-center gap-1.5 text-center text-[0.6rem] tracking-[.2rem] uppercase sm:text-xs lg:text-base">
                            <a className="z-30 font-bold hover:underline" href="mailto:info@safeandsoundpost.com">
                                info@safeandsoundpost.com
                            </a>
                            <span className="tooltip z-30" data-tip={emailCopied ? "Copied!" : "Copy email"}>
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-circle btn-xs lg:btn-sm"
                                    onClick={copyEmail}
                                    aria-label="Copy email address to clipboard"
                                >
                                    {emailCopied ? <IoCheckmark className="size-3.5 lg:size-4" /> : <IoCopyOutline className="size-3.5 lg:size-4" />}
                                </button>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <img
                draggable="false"
                className="absolute top-[50%] left-[-3%] z-10 w-1/2 -rotate-6 opacity-90"
                src={oldContactForm}
                alt="Contact form background"
            />
            <img
                draggable="false"
                className="absolute top-0 left-[62%] z-10 w-1/2 rotate-[23deg] opacity-90"
                src={oldContactForm}
                alt="Contact form background"
            />
            <img
                draggable="false"
                className="absolute top-[40%] left-[60%] z-10 w-1/2 rotate-[230deg] opacity-90"
                src={oldContactForm}
                alt="Contact form background"
            />
        </section>
    );
}
