import logo from "../assets/ontree.svg";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className="flex justify-between max-w-[1300px] mx-auto p-6 w-full">
      <NavLink to={"/"}>
        <img src={logo} alt="OnEntree logo" />
      </NavLink>

      <div className="flex flex-1 ml-24 gap-6">
        <a href="/" className="text-white">
          Home
        </a>
        {/* <a href="/eventos" className="text-white">
          Eventos
        </a> */}
        <a href="/locais" className="text-white">
          Locais
        </a>
      </div>
    </div>
  );
}
