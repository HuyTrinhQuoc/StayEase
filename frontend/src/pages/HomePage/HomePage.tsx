import FeaturedRooms from "../../components/HomeComponent/FeatureRoom.tsx";
import About from "../../components/HomeComponent/About.tsx";
import Hero from "../../components/HomeComponent/Hero.tsx";


const HomePage = () => {
    return (
        <div className="bg-[#fcf9f8] text-black">
            <Hero />
            <About />
            <FeaturedRooms />
        </div>
    );
};

export default HomePage;