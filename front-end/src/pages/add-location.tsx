import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { FormField } from "../components/FormField";
import { STATES } from "../utils/Helpers";
import { MultiInput } from "../components/multiInput";

enum LocationType {
  Stadium = "Stadium",
  Teather = "Teather",
  Other = "Other",
}

export type LocationInputs = {
  name: string;
  nickname?: string;
  type: LocationType;
  cnpj?: string;
  city: string;
  state: string;
  cep: string;
  address: string;
  complement?: string;
  email: string;
  phone?: string;
  entrances?: string[];
  turnstiles?: string[];
};

export function AddLocationPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LocationInputs>();
  const [entrances, setEntrances] = useState<string[]>([]);
  const [gates, setGates] = useState<string[]>([]);
  const [addLocationError, setAddLocationError] = useState("");
  const navigate = useNavigate();

  async function onSubmit(data: LocationInputs) {
    try {
      // Add entrances and turnstiles to the data object
      const locationData = {
        ...data,
        entrances,
        turnstiles: gates,
      };

      const response = await fetch("http://localhost:3000/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Result:", result);
      navigate("/locais");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setAddLocationError(error.message);
      } else {
        setAddLocationError("An unknown error occurred.");
      }
    }
  }

  const currentRoute = { name: "Locais", href: "/locais" };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center p-9 w-full h-full max-w-[750px] mx-auto">
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
            <h1 className="text-3xl mt-5 text-white">Adicionar novo local</h1>
            <h2 className="text-sm mt-5 text-white">*Campos obrigatórios</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-900 justify-between p-6 rounded-2xl"
          >
            <div>
              <h2 className="mb-6 text-white">Informações básicas</h2>
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <FormField<LocationInputs>
                  fieldId="name"
                  errors={errors}
                  placeholder="Informe o nome do local"
                  register={register}
                  isRequired
                  label="Nome do local"
                />
                <FormField<LocationInputs>
                  fieldId="nickname"
                  errors={errors}
                  placeholder="Informe um apelido (caso exista)"
                  register={register}
                  label="Apelido"
                />
                <FormField<LocationInputs>
                  fieldId="type"
                  errors={errors}
                  placeholder="Selecione um tipo"
                  register={register}
                  isRequired
                  label="Selecione um tipo"
                  type="select"
                  options={[
                    { label: "Estadio", value: LocationType.Stadium },
                    { label: "Teatro", value: LocationType.Teather },
                    { label: "Outro", value: LocationType.Other },
                  ]}
                />
                <FormField<LocationInputs>
                  fieldId="cnpj"
                  errors={errors}
                  placeholder="Informe o cnpj (caso exista)"
                  register={register}
                  label="CNPJ"
                  type="number"
                  otherRegisterValidations={{
                    pattern: {
                      value: /^\d{2}\d{3}\d{3}\d{4}\d{2}$/,
                      message: "CNPJ inválido (digite apenas números)",
                    },
                  }}
                />
              </div>
            </div>

            <div className="my-6 border-t border-gray-700"></div>

            <div>
              <h2 className="mb-6 text-white">Localização</h2>
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <FormField<LocationInputs>
                  fieldId="city"
                  errors={errors}
                  placeholder="Informe a Cidade"
                  register={register}
                  isRequired
                  label="Cidade"
                />
                <FormField<LocationInputs>
                  fieldId="state"
                  errors={errors}
                  placeholder="Selecione um estado"
                  register={register}
                  isRequired
                  type="select"
                  options={STATES.map((state) => ({
                    label: state.name,
                    value: state.abbreviation,
                  }))}
                  label="Estado"
                />
                <FormField<LocationInputs>
                  fieldId="cep"
                  errors={errors}
                  placeholder="Informe o CEP"
                  register={register}
                  isRequired
                  label="CEP"
                  otherRegisterValidations={{
                    pattern: {
                      value: /^[0-9]{5}[0-9]{3}$/,
                      message: "CEP inválido (digite apenas números)",
                    },
                  }}
                />
                <FormField<LocationInputs>
                  fieldId="address"
                  errors={errors}
                  placeholder="Informe o Endereço"
                  register={register}
                  isRequired
                  label="Endereço"
                />
                <FormField<LocationInputs>
                  fieldId="complement"
                  errors={errors}
                  placeholder="Informe o complemento"
                  register={register}
                  label="Complemento"
                />
              </div>
            </div>

            <div className="my-6 border-t border-gray-700"></div>

            <div>
              <h2 className="mb-6 text-white">Contato</h2>
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <FormField<LocationInputs>
                  fieldId="email"
                  errors={errors}
                  placeholder="Informe um e-mail"
                  register={register}
                  isRequired
                  label="E-mail"
                  otherRegisterValidations={{
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "E-mail inválido",
                    },
                  }}
                />
                <FormField<LocationInputs>
                  fieldId="phone"
                  errors={errors}
                  placeholder="Informe um telefone"
                  register={register}
                  label="Telefone"
                  otherRegisterValidations={{
                    pattern: {
                      value:
                        /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
                      message: "Telefone inválido",
                    },
                  }}
                />
              </div>
            </div>

            <div className="my-6 border-t border-gray-700"></div>

            <div>
              <h2 className="mb-6 text-white">
                Cadastro de entradas e catracas
              </h2>
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <MultiInput
                  handleValues={setEntrances}
                  placeholder="Insira as entradas"
                  iconAriaLabel="Adicionar entrada"
                  id="entrances"
                  label="Cadastre as entradas"
                />
                <MultiInput
                  handleValues={setGates}
                  placeholder="Insira as catracas"
                  iconAriaLabel="Adicionar catraca"
                  id="gates"
                  label="Cadastre as catracas"
                />
              </div>
            </div>

            <div className="my-6 border-t border-gray-700"></div>

            {addLocationError && (
              <div>
                <p className="text-red-600">
                  Erro: {JSON.stringify(addLocationError)}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-6">
              <Link to="/locais">
                <button className="border border-gray-200 text-gray-200 py-2 px-4 rounded hover:bg-gray-200 hover:text-gray-900">
                  Cancelar
                </button>
              </Link>

              <button
                type="submit"
                className="bg-gray-200 text-gray-900 py-2 px-4 rounded hover:bg-gray-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
