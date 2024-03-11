import contactForm from "../../assets/images/contact/contact-form.png";

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative my-16 flex w-full flex-col items-center justify-center gap-10 py-28 pb-28 align-middle"
        >
            <div
                className="relative z-20 aspect-video h-fit w-full bg-contain bg-center bg-no-repeat text-4xl font-semibold text-black"
                style={{ backgroundImage: `url(${contactForm})` }}
            >
                <div className="absolute left-[80px] top-[31%] flex flex-col gap-6">
                    <div className="flex gap-20">
                        <input
                            className="w-[37%] bg-transparent uppercase tracking-widest placeholder:text-black"
                            placeholder="[  N A M E  ]"
                        />
                        <input
                            className="w-[50%] bg-transparent uppercase tracking-widest placeholder:px-16 placeholder:text-black"
                            placeholder="[  E M A I L  ]"
                        />
                    </div>
                    <input
                        className="w-[90%] bg-transparent uppercase tracking-widest placeholder:text-black"
                        placeholder="[  P H O N E   N U M B E R  ]"
                    />
                </div>
                <div className="absolute left-[140px] top-[49%] flex w-[54%] h-[13em] flex-col gap-6 text-xl leading-[1.85em]">
                    <textarea className="resize-none h-full bg-transparent placeholder:text-black tracking-widest" placeholder="[ WHAT CAN WE HELP YOU WITH? ]" />
                </div>
            </div>
            <img
                className="absolute left-[-10%] top-[65%] z-10 w-1/2 -rotate-6 opacity-90"
                src={contactForm}
            />
            <img
                className="absolute left-[62%] top-[8%] z-10 w-1/2 rotate-[23deg] opacity-90"
                src={contactForm}
            />
            <img
                className="absolute left-[60%] top-[40%] z-10 w-1/2 rotate-[230deg] opacity-90"
                src={contactForm}
            />
        </section>
    );
}
