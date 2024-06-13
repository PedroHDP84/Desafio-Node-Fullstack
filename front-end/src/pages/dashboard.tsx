import bg from "../assets/bg.png";
import avatar from "../assets/avatar.svg";
import { Header } from "../components/header";
import { LocationsSection } from "../components/dashboard/LocationsSection";
import { EventsSection } from "../components/dashboard/EventsSection";

export function Dashboard() {
  const userMockName = "Mariana";

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover px-6">
      <Header />
      <div className="flex justify-center items-center py-9 max-w-[1300px] mx-auto h-full w-full">
        <div className="w-full max-w-[1300px]">
          <div className="flex items-center">
            <img src={avatar} alt="Body Illustration" />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-white">
                Olá, {userMockName}
              </h2>
              <p className="text-white">
                Confira todos os seus eventos e locais em um só lugar!
              </p>
            </div>
          </div>
          <div className="mt-6 md:flex gap-6 justify-between">
            <div className="w-full flex flex-col gap-8">
              <LocationsSection />
            </div>
            <div className="w-full flex flex-col gap-8 mt-20 md:mt-0">
              <EventsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
