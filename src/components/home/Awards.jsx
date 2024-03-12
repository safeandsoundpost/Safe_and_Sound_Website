import PropTypes from "prop-types";

export default function Awards() {
    const awardsList = [
        { event: "San Francisco Arthouse Short Festival", category: "Best Sound Design" },
        { event: "Portland Moviemakers Award", category: "Best Sound Design" },
        { event: "San Diego International Film Awards", category: "Best Sound Design" },
        { event: "Dublin Movie Awards", category: "Best Sound Design" },
        { event: "Denver Movie Awards", category: "BEST SOUND DESIGN" },
        { event: "Rome International Short Festival", category: "Short Sound Design" },
        { event: "Chicago Filmmaker Awards", category: "Best Sound Design" },
        { event: "Arthouse Festival of Beverly Hills", category: "Best Short Score" },
        { event: "Washington Film Awards", category: "Best Sound Design" },
        { event: "Independent Shorts Awards", category: "Best Sound Design" },
        { event: "Independent Shorts Awards", category: "Best Original Score" },
        { event: "Cannes Shorts", category: "Best Sound Design" },
    ];

    return (
        <section id="awards" className="py-10">
            <h2 className="text-4xl font-bold uppercase tracking-widest text-center text-secondary my-10">
                Awards
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
                {awardsList.map((award, index) => (
                    <AwardCard
                        key={index}
                        title={award.event}
                        category={award.category}
                    />
                ))}
            </div>
        </section>
    );
}

function AwardCard({ title, category }) {
    return (
        <div className="flex flex-col justify-center items-center min-h-[10rem] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 border border-gray-200 rounded shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out space-y-2">
            <h3 className="text-xl font-semibold text-center">{title}</h3>
            <p className="text-center text-secondary italic">{category}</p>
        </div>
    );
}

AwardCard.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};
