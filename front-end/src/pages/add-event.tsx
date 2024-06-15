import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { FormField } from "../components/FormField";

enum EventType {
  Futebol = "Futebol",
  Show = "Show",
  Other = "Other",
}

export type EventInputs = {
  name: string;
  type: EventType;
  startDate: string;
  startTime: string;
  locationId: number;
  email: string;
  phone?: string;
};

export function AddEventPage() {
  const currentRoute = { name: "Eventos", href: "/Eventos" };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EventInputs>();
  const [addEventError, setAddEventError] = useState("");
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:3000/locations");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        // console.log(result);
        setLocations(result.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  async function onSubmit(data: EventInputs) {
    const [day, month, year] = data.startDate.split("/");
    const [hours, minutes] = data.startTime.split("h");
    const validStartDate = new Date(
      `${month}/${day}/${year} ${hours}:${minutes}:00`
    );

    // Calculate end date as start date plus 2 hours
    const validEndDate = new Date(validStartDate);
    validEndDate.setHours(validStartDate.getHours() + 2);

    try {
      const eventData = {
        name: data.name,
        type: data.type,
        startDate: validStartDate.toISOString(),
        endDate: validEndDate.toISOString(),
        locationId: data.locationId,
        phone: data.phone,
        email: data.email,
      };
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create event!`);
      }
      const result = await response.json();
      if ("error" in result) {
        setAddEventError(result.error);
      } else {
        console.log("Event created successfully!");
        navigate("/eventos");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }

  const locationOptions = locations?.map((location: any) => ({
    label: location.name,
    value: location.id,
  }));

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
                <FormField<EventInputs>
                  fieldId="name"
                  errors={errors}
                  placeholder="Informe o nome do evento"
                  register={register}
                  isRequired
                  label="Nome do evento"
                />
                <FormField<EventInputs>
                  fieldId="type"
                  errors={errors}
                  placeholder="Selecione um tipo"
                  register={register}
                  isRequired
                  label="Selecione um tipo"
                  type="select"
                  options={[
                    { label: "Futebol", value: EventType.Futebol },
                    { label: "Show", value: EventType.Show },
                    { label: "Outro", value: EventType.Other },
                  ]}
                />
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <FormField<EventInputs>
                  fieldId="startDate"
                  errors={errors}
                  placeholder="DD/MM/AAAA"
                  register={register}
                  isRequired
                  label="Data do evento"
                  otherRegisterValidations={{
                    pattern: {
                      value:
                        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                      message: "Data inválido (digite no formato DD/MM/AAAA)",
                    },
                  }}
                />
                <FormField<EventInputs>
                  fieldId="startTime"
                  errors={errors}
                  placeholder="00h00"
                  register={register}
                  isRequired
                  label="Horario do evento"
                  otherRegisterValidations={{
                    pattern: {
                      value: /^(0[0-9]|1[0-9]|2[0-3])h([0-5][0-9])$/,
                      message: "Horario inválido (digite no formato 00h00",
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <FormField<EventInputs>
                  fieldId="locationId"
                  errors={errors}
                  placeholder="Selecione um local"
                  register={register}
                  isRequired
                  type="select"
                  options={locationOptions}
                  label="Selecione um local"
                />
              </div>
            </div>

            <div className="my-6 border-t border-gray-700"></div>

            <div>
              <h2 className="mb-6 text-white">Contato</h2>
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <FormField<EventInputs>
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
                <FormField<EventInputs>
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

            {addEventError && (
              <div>
                <p className="text-red-600">
                  Erro: {JSON.stringify(addEventError)}
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
