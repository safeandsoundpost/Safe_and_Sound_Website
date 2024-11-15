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

        if (
            // eslint-disable-next-line no-useless-escape
            /^(?:\(\d{3}\) \d{3}\-\d{4}|\d{1}(?:(?:\d{2}\.\d{3}\.\d{4}|\d{2}\-\d{3}\-\d{4})|\d{9}))$/.test(
                phone,
            ) === false
        ) {
            alert("Please enter a valid phone number");
            return;
        }

        if (!message) {
            alert("Please enter your message");
            return;
        }

        // if (/^[a-zA-Z\s]*$/.test(message) === false) {
        //     alert("Please enter a valid message");
        //     return;
        // }

        // console.log(name, email, phone, message);

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
                className="relative z-20 aspect-video h-fit w-full bg-contain bg-center bg-no-repeat text-xs font-semibold text-black md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl"
                style={{ backgroundImage: `url(${contactForm})` }}
            >
                <div className="absolute left-6 top-[30%] flex flex-col gap-0 md:left-[40px] md:gap-0 lg:left-[60px] lg:gap-1 xl:left-[8%] xl:top-[32%] 2xl:gap-6">
                    <div className="flex gap-0 md:gap-5">
                        <input
                            className="w-[43%] bg-transparent uppercase tracking-widest placeholder:text-gray-600 md:w-[50%]"
                            placeholder="[  N A M E  ]"
                            value={name}
                            onInput={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-[43%] bg-transparent uppercase tracking-widest placeholder:text-gray-600 md:w-[50%]"
                            type="email"
                            placeholder="[  E M A I L  ]"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <input
                        className="w-[85%] bg-transparent uppercase tracking-widest placeholder:text-gray-600 md:w-[88%]"
                        type="tel"
                        placeholder="[  P H O N E   N U M B E R  ]"
                        value={phone}
                        onInput={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div
                    className="absolute left-[12%] top-[50%] flex h-[8em] w-[54%] flex-col gap-6 text-[.45em] 
                md:left-[75px] md:top-[50.5%] md:text-xs
                lg:left-[80px] lg:top-[50.3%] lg:text-base
                xl:left-[12%] xl:top-[50%] xl:text-lg"
                >
                    <textarea
                        className="h-full resize-none bg-transparent leading-[0.65rem] tracking-widest placeholder:text-gray-600 md:leading-[1.2rem] lg:leading-[2.3rem]"
                        placeholder="[ WHAT CAN WE HELP YOU WITH? ]"
                        value={message}
                        onInput={(e) => setMessage(e.target.value)}
                    />
                </div>
            </div>
            {!isSubmitted && (
                <button
                    className=" btn btn-xs absolute right-[9%] top-[61.5%] z-30 h-[1em] w-[10em] text-[.45em] uppercase tracking-[.2em]
                                sm:right-[7%] sm:top-[64%] sm:text-xs
                                md:btn-xs lg:btn-sm xl:btn-md md:right-[10%]
                                md:top-[67%] md:text-xs lg:right-[11.5%] lg:top-[68%]
                                lg:text-sm xl:right-[12.5%] xl:top-[70%] xl:text-lg
                                2xl:right-[17%] 2xl:top-[74%] 2xl:text-lg"
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
