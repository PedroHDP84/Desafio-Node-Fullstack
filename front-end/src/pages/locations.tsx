import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../assets/search.svg";
import { Header } from "../components/header";

const currentRoute = { name: "Locais", href: "/locais" };

const columns = [
  { header: "Nome do local", property: "name" },
  { header: "Endereço", property: "address" },
  { header: "Cidade e Estado", property: "cityAndState" },
  { header: "Portões cadastrados", property: "gates" },
  { header: "Atualização", property: "updatedAt" },
];

const mockData = {
  data: [
    {
      id: "mock1",
      name: "modck1",
      address: "modck1",
      cityAndState: "modck1",
      gates: "modck1",
      updatedAt: "modck1",
    },
    {
      id: "mock2",
      name: "modck2",
      address: "modck2",
      cityAndState: "modck2",
      gates: "modck2",
      updatedAt: "modck2",
    },
    {
      id: "mock3",
      name: "modck3",
      address: "modck3",
      cityAndState: "modck3",
      gates: "modck3",
      updatedAt: "modck3",
    },
  ],
  page: 1,
  totalPages: 1,
};

const data = mockData.data;
const currentPage = mockData.page;
const totalPages = mockData.totalPages;

export function LocationsPage() {
  const [searchArgument, setSearchArgument] = useState("");

  function onDelete(id: string) {
    console.log(id);
  }

  function onPageChange(page: number) {
    console.log(page);
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      console.log("search for", searchArgument);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchArgument]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center p-9 w-full h-full max-w-[1300px] mx-auto">
        <div className="w-full h-full mt-9">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li className="text-blue-500">
                <span className="text-gray-500"> / </span>
                <Link to={currentRoute.href} className="text-blue-500">
                  {currentRoute.name}
                </Link>
              </li>
            </ol>
          </nav>
          <div className="mb-6">
            <h1 className="text-3xl mt-5 text-white">Locais</h1>
            <h2 className="text-sm mt-5 text-white">
              Confira a lista de todos os locais cadastrados
            </h2>
          </div>
          <div className="bg-[#10141D] justify-between p-6 rounded-2xl">
            <div className="md:flex md:justify-between mb-6">
              <div className="flex items-center max-w-lg mb-5 md:mb-0">
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <img
                      className="w-6 h-6"
                      src={searchIcon}
                      alt="search icon"
                    />
                  </span>
                  <input
                    type="text"
                    placeholder="Pesquise por nome ou apelido do local."
                    value={searchArgument}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchArgument(e.target.value)
                    }
                    className="block w-full pl-10 p-2.5 bg-gray-800 border border-gray-700 rounded-md text-white"
                  />
                </div>
              </div>

              <Link to="/locais/criar">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Adicionar local
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-white">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.header}
                        className="py-2 px-4 text-left min-w-40"
                      >
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} className="even:bg-gray-800">
                      {columns.map((column) => (
                        <td
                          className="py-2 px-4 text-ellipsis overflow-hidden max-w-xs"
                          key={String(column.property)}
                        >
                          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                          {/* @ts-expect-error */}
                          {String(row[column.property])}
                        </td>
                      ))}
                      <td className="py-2 px-4">
                        <div className="flex space-x-4">
                          <button
                            aria-label="Remover"
                            className="text-red-400 hover:text-red-500"
                            onClick={() => onDelete(row.id)}
                          >
                            Apagar
                          </button>
                          <Link
                            className="text-yellow-300 hover:text-yellow-500"
                            to="/"
                          >
                            Editar
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => {
              const realPage = index + 1;
              return (
                <button
                  key={realPage}
                  className={`mx-1 px-3 py-1 rounded ${
                    realPage === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-500 hover:bg-gray-700"
                  }`}
                  onClick={() => onPageChange(realPage)}
                >
                  {realPage}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
