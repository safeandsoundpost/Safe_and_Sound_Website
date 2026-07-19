import Banner from "./Banner";
import CsaWin from "../components/home/CsaWin";
import FeaturedPosters from "../components/home/FeaturedPosters";
import HorrorBox from "../components/home/HorrorBox";
import { FeaturedClients, PartnerClients } from "../components/home/Clients";
import Reviews from "../components/home/Reviews";
import Contact from "../components/home/Contact";

export default function Home() {
    return (
        <main className="flex w-full flex-col select-none">
            <Banner />
            <CsaWin />
            <FeaturedPosters />
            <HorrorBox />
            <FeaturedClients />
            <div className="hidden md:block md:pt-14">
                <PartnerClients />
            </div>
            <div className="m-auto w-11/12 pb-16 lg:w-3/4 xl:w-[65%]">
                <Reviews featuredOnly />
                <Contact />
            </div>
        </main>
    );
}
