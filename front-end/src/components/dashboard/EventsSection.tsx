import { Link } from "react-router-dom";
import icon from "../../assets/mdLocal.svg";
import { useEffect, useState } from "react";

type EventData = {
  name: string;
  tag: string;
  locationName: string;
  id: string;
};

export function EventsSection() {
  const [events, setEvents] = useState<EventData[]>([]);
  44;

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => setEvents(data.slice(0, 3))) // Map only the first 3 locations
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  return (
    <>
      <div className={`w-full bg-[#461527] p-6 rounded-lg md:max-w-[600px]`}>
        <div className="flex justify-between items-center gap-6">
          <div className="flex-2 mr-4">
            <div className="flex gap-2">
              <img className="w-6 h-6" src={icon} alt="Locais icon" />
              <h2 className="text-xl font-bold text-white">Eventos</h2>
            </div>
            <p className="text-white">Confira todos os eventos cadastrados!</p>
          </div>
          <Link to="/eventos">
            <button className="bg-[#CAD6EC] text-[#10141D] hover:bg-[#828fa8] hover:text-white py-2 px-4 rounded">
              Conferir eventos
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full md:max-w-[600px] p-8 bg-[#10141D] rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-md mb-6 text-white">
            Últimos eventos adicionados
          </h1>
          <Link to={"/eventos"} className="text-[#6D99FB] underline">
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-white">
            <tbody>
              {events.map((item: any) => (
                <tr key={String(item.id)} className="border-t border-gray-700">
                  <td
                    className="h-[3.25rem] max-w-[125px] overflow-hidden truncate"
                    key="name"
                  >
                    {String(item.name)}
                  </td>
                  <td
                    className="h-[3.25rem] max-w-[125px] overflow-hidden truncate"
                    key="tag"
                  >
                    {String(item.tag)}
                  </td>
                  <td
                    className="h-[3.25rem] max-w-[125px] overflow-hidden truncate"
                    key="placeName"
                  >
                    {String(item.locationName)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
