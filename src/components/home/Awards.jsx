import PropTypes from "prop-types";

export default function Awards() {
    return (
        <section
            id="awards"
            className="flex w-full flex-col items-center justify-center gap-10 py-10 align-middle"
        >
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                awards
            </h2>

            <div className="flex w-full items-center justify-center gap-12 align-middle">
                <AwardCard
                    title={"figures\n2022"}
                    subTitle={
                        <>
                            <span className="font-semibold">{"director:\n"}</span>
                            <i>{"jamie\nhegland /\njade yurich"}</i>
                        </>
                    }
                >
                    <p className="text-xl uppercase leading-6">
                        <span className="font-bold">
                            washington film awards 2022
                        </span>
                        <br />
                        <i>best sound design</i>
                    </p>
                    <br />
                    <br />
                    <p className="text-xl uppercase leading-6">
                        <span className="font-bold">
                            feel the reel internation film festival 2022
                        </span>
                        <br />
                        <i>best original score nominee</i>
                    </p>
                </AwardCard>
            </div>
        </section>
    );
}

function AwardCard({ title, subTitle, children }) {
    return (
        <div className="flex w-[90%] justify-start gap-16 border-y-2 py-8 align-middle text-primary">
            <div className="whitespace-pre text-xl uppercase">{subTitle}</div>
            <h4 className="whitespace-pre text-3xl font-bold uppercase">
                {title}
            </h4>
            <div>{children}</div>
        </div>
    );
}

AwardCard.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.node,
    children: PropTypes.node,
};
