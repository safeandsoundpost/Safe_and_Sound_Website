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
        { event: "These Triggas", category: "CSA Nomination for Best Web Program or Series" },
    ];

    return (
        <section id="awards" className="relative py-10">
            <h2 className="text-secondary my-10 text-center text-4xl font-bold tracking-widest uppercase">Awards</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:flex-wrap md:justify-center md:gap-8">
                {awardsList.map((award, index) => (
                    <AwardCard key={index} title={award.event} category={award.category} />
                ))}
            </div>
            <img
                className="absolute -top-6 -left-[70%] max-md:scale-75 md:-top-[20%] md:-left-[95%] lg:-left-[90%] xl:-left-[82%] 2xl:-left-[75%]"
                src={awardsDecoration}
                alt="Awards decorator"
            />
        </section>
    );
}

function AwardCard({ title, category }) {
    return (
        <div className="flex w-full flex-col items-center justify-center space-y-2 rounded-sm border border-gray-200 p-4 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl md:min-h-[10rem] md:w-1/3 lg:w-1/4 xl:w-1/5">
            <h3 className="text-center text-sm font-semibold md:text-xl">{title}</h3>
            <p className="text-secondary text-center text-xs italic md:text-base">{category}</p>
        </div>
    );
}

AwardCard.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};
