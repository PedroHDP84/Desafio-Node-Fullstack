import { Link } from "react-router-dom";
import icon from "../../assets/mdFestival.svg";

type LocationData = {
  name: string;
  address: string;
  entrances: string[];
  id: string;
};

const mockData: LocationData[] = [
  {
    id: "mockid1",
    name: "Morumbis",
    address: "Avenida Francisco Matarazzo, 1705 – Água Branca",
    entrances: ["C", "D", "E", "F", "G", "H", "I", "J", "K"],
  },
  {
    id: "mockid2",
    name: "Allianz Parque",
    address: "Avenida Francisco Matarazzo, 1705 – Água Branca",
    entrances: ["3", "4", "5", "6", "7", "8", "9", "10"],
  },
  {
    id: "mockid3",
    name: "Neo Química Arena",
    address: "Avenida Francisco Matarazzo, 1705 – Água Branca",
    entrances: ["lazar@chakra-ui.com"],
  },
];

export function LocationsSection() {
  return (
    <>
      <div className={`w-full bg-[#2F3B28] p-6 rounded-lg md:max-w-[600px]`}>
        <div className="flex justify-between items-center gap-6">
          <div className="flex-2 mr-4">
            <div className="flex gap-2">
              <img className="w-6 h-6" src={icon} alt="Locais icon" />
              <h2 className="text-xl font-bold text-white">Locais</h2>
            </div>
            <p className="text-white">Confira todos os locais cadastrados!</p>
          </div>
          <Link to="/locais">
            <button className="bg-[#CAD6EC] text-[#10141D] hover:bg-[#828fa8] hover:text-white py-2 px-4 rounded">
              Conferir locais
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full md:max-w-[600px] p-8 bg-[#10141D] rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-md mb-6 text-white">
            Últimos eventos adicionados
          </h1>
          <Link to={"/locais"} className="text-[#6D99FB] underline">
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-white">
            <tbody>
              {mockData.map((item) => (
                <tr key={String(item.id)} className="border-t border-gray-700">
                  <td
                    className="h-[3.25rem] max-w-[125px] overflow-hidden truncate"
                    key="name"
                  >
                    {String(item.name)}
                  </td>
                  <td
                    className="h-[3.25rem] max-w-[125px] overflow-hidden truncate"
                    key="address"
                  >
                    {String(item.address)}
                  </td>
                  <td
                    className="h-[3.25rem] max-w-[125px] overflow-hidden truncate"
                    key="entrances"
                  >
                    {String(item.entrances)}
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
