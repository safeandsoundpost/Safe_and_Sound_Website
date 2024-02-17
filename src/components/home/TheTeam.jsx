import teamPic from "../../assets/images/team/tempTeamPhoto.png";

export default function TheTeam() {
    return (
        <section
            id="services"
            className="flex w-full flex-col items-center justify-center gap-10 py-10 align-middle"
        >
            <h2 className="w-full py-10 text-center text-4xl font-bold uppercase tracking-widest text-secondary">
                who we are
            </h2>

            <div className="flex flex-col">
                <div className="flex flex-col gap-5">
                    {[...Array(4).keys()].map((num) => (
                        <img src={teamPic} key={num} className="w-3/4" />
                    ))}
                </div>
                <div className="w-full grow">
                    <p></p>
                </div>
            </div>
        </section>
    );
}
