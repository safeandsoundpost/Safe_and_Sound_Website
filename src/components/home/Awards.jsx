import PropTypes from "prop-types";
import awardsDecoration from "../../assets/images/symbols/awards.png";

export default function Awards() {
    const awardsList = [
        { event: "These Triggas", category: "CSA Nomination for Best Web Program or Series" },
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

    const csaWin = {
        event: "Cows Come Home",
        category: "CSA Winner for Best Web Program or Series, Fiction",
        gold: true,
    };

    return (
        <section id="awards" className="relative pt-10">
            <h2 className="text-secondary my-10 text-center text-4xl font-bold tracking-widest uppercase">Awards</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <div className="col-span-2 flex items-center justify-center gap-4 rounded-sm border border-gray-200 p-4 shadow-lg md:min-h-[10rem]">
                    <img src="/images/csa-logo.png" alt="2026 Canadian Screen Awards" className="w-1/2 object-contain" />
                    <div className="flex w-1/2 flex-col items-center justify-center space-y-2">
                        <h3 className="text-center text-sm font-semibold md:text-xl">{csaWin.event}</h3>
                        <p className="text-center text-xs italic text-yellow-400 md:text-base">{csaWin.category}</p>
                    </div>
                </div>
                {awardsList.map((award, index) => (
                    <AwardCard key={index} title={award.event} category={award.category} winner={award.winner} gold={award.gold} />
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

function AwardCard({ title, category, winner, gold }) {
    return (
        <div className="flex w-full flex-col items-center justify-center space-y-2 rounded-sm border border-gray-200 p-4 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl md:min-h-[10rem]">
            <h3 className="text-center text-sm font-semibold md:text-xl">{title}</h3>
            <p className={`text-center text-xs italic md:text-base ${gold ? "text-yellow-400" : "text-secondary"}`}>{category}</p>
            {winner && <p className="text-center text-xs text-gray-400 md:text-sm">{winner}</p>}
        </div>
    );
}

AwardCard.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    winner: PropTypes.string,
    gold: PropTypes.bool,
};
