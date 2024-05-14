import PropTypes from "prop-types";
import awardsDecoration from "../../assets/images/symbols/awards.png";

export default function Awards() {
    const awardsList = [
        {
            event: "San Francisco Arthouse Short Festival",
            category: "Best Sound Design",
        },
        { event: "Portland Moviemakers Award", category: "Best Sound Design" },
        {
            event: "San Diego International Film Awards",
            category: "Best Sound Design",
        },
        { event: "Dublin Movie Awards", category: "Best Sound Design" },
        { event: "Denver Movie Awards", category: "Best Sound Design" },
        {
            event: "Rome International Short Festival",
            category: "Short Sound Design",
        },
        { event: "Chicago Filmmaker Awards", category: "Best Sound Design" },
        {
            event: "Arthouse Festival of Beverly Hills",
            category: "Best Short Score",
        },
        { event: "Washington Film Awards", category: "Best Sound Design" },
        { event: "Independent Shorts Awards", category: "Best Sound Design" },
        { event: "Independent Shorts Awards", category: "Best Original Score" },
        { event: "Cannes Shorts", category: "Best Sound Design" },
    ];

    return (
        <section id="awards" className="relative py-10">
            <h2 className="my-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                Awards
            </h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:flex md:flex-wrap md:justify-center md:gap-8">
                {awardsList.map((award, index) => (
                    <AwardCard
                        key={index}
                        title={award.event}
                        category={award.category}
                    />
                ))}
            </div>
            <img
                className="absolute -left-64 -top-6 max-md:scale-75 md:-left-[62%] md:-top-[20%]"
                src={awardsDecoration}
            />
        </section>
    );
}

function AwardCard({ title, category }) {
    return (
        <div className="flex md:min-h-[10rem] w-full flex-col items-center justify-center space-y-2 rounded border border-gray-200 p-4 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl md:w-1/3 lg:w-1/4 xl:w-1/5">
            <h3 className="text-center text-sm font-semibold md:text-xl">
                {title}
            </h3>
            <p className="text-center text-xs italic text-secondary md:text-base">
                {category}
            </p>
        </div>
    );
}

AwardCard.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};
