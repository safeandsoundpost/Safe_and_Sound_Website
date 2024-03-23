import { useState } from "react";
import emailjs from "@emailjs/browser";
import contactForm from "../../assets/images/contact/contact-form.png";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submitForm = () => {
        if (!name) {
            alert("Please enter your name");
            return;
        }

        if (/^[a-zA-Z\s]*$/.test(name) === false) {
            alert("Please enter a valid name");
            return;
        }

        if (!email) {
            alert("Please enter your email");
            return;
        }

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
            alert("Please enter a valid email");
            return;
        }

        if (!phone) {
            alert("Please enter your phone number");
            return;
        }

        if (/^\d{10}$/.test(phone) === false) {
            alert("Please enter a valid phone number");
            return;
        }

        if (!message) {
            alert("Please enter your message");
            return;
        }

        if (/^[a-zA-Z\s]*$/.test(message) === false) {
            alert("Please enter a valid message");
            return;
        }

        console.log(name, email, phone, message);

        setIsLoading(true);
        setTimeout(() => {
            emailjs
                .send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    {
                        from_name: name,
                        from_email: email,
                        from_phone: phone,
                        message: message,
                    },
                    {
                        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                    },
                )
                .then(() => {
                    setIsLoading(false);
                    alert("Your message has been sent successfully!");
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                    setIsSubmitted(true);
                })
                .catch((ex) => {
                    console.error(ex);
                    alert(
                        "An error occurred while sending the email, please try again later.",
                    );
                });
        }, 3000);
    };

    return (
        <section
            id="contact"
            className="relative my-16 flex w-full flex-col items-center justify-center gap-10 py-28 pb-28 align-middle"
        >
            <div
                className="relative z-20 aspect-video h-fit w-full bg-contain bg-center bg-no-repeat text-xs font-semibold text-black md:text-4xl"
                style={{ backgroundImage: `url(${contactForm})` }}
            >
                <div className="absolute left-6 top-[31%] flex flex-col gap-0 md:left-[80px] md:gap-6">
                    <div className="flex gap-0 md:gap-20">
                        <input
                            className="w-[37%] bg-transparent uppercase tracking-widest placeholder:text-black"
                            placeholder="[  N A M E  ]"
                            value={name}
                            onInput={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-[50%] bg-transparent uppercase tracking-widest placeholder:px-16 placeholder:text-black"
                            type="email"
                            placeholder="[  E M A I L  ]"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <input
                        className="w-[88%] bg-transparent uppercase tracking-widest placeholder:text-black"
                        type="tel"
                        placeholder="[  P H O N E   N U M B E R  ]"
                        value={phone}
                        onInput={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="absolute left-10 top-[49%] flex h-[13em] w-[54%] flex-col gap-6 text-[.45em] leading-[1.85em] md:left-[140px] md:text-xl">
                    <textarea
                        className="h-full resize-none bg-transparent tracking-widest placeholder:text-black"
                        placeholder="[ WHAT CAN WE HELP YOU WITH? ]"
                        value={message}
                        onInput={(e) => setMessage(e.target.value)}
                    />
                </div>
            </div>
            {!isSubmitted && (
                <button
                    className="btn btn-xs absolute max-md:text-[.55em] right-12 top-[16rem] z-30 h-[1em] w-[7em] uppercase tracking-[.2em] md:btn-sm md:right-[17%] md:top-[72.5%]"
                    src={contactForm}
                    onClick={submitForm}
                >
                    {isLoading && (
                        <span className="loading loading-spinner loading-md"></span>
                    )}
                    submit
                </button>
            )}
            <img
                draggable="false"
                className="absolute left-[-10%] top-[65%] z-10 w-1/2 -rotate-6 opacity-90"
                src={contactForm}
            />
            <img
                draggable="false"
                className="absolute left-[62%] top-[8%] z-10 w-1/2 rotate-[23deg] opacity-90"
                src={contactForm}
            />
            <img
                draggable="false"
                className="absolute left-[60%] top-[40%] z-10 w-1/2 rotate-[230deg] opacity-90"
                src={contactForm}
            />
        </section>
    );
}
