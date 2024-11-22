import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import { IoLayers } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { TbCalendarWeek } from "react-icons/tb";
import { TbMapSearch } from "react-icons/tb";

const estilosMapbox = {
  topografico: "mapbox://styles/mapbox/outdoors-v12",
  luciernaga: "mapbox://styles/mapbox/light-v11",
  calles: "mapbox://styles/mapbox/streets-v12",
  satelite: "mapbox://styles/mapbox/satellite-v9",
  dark:"mapbox://styles/mapbox/dark-v11"
};

const ModalMapas = ({ open, onClose, cambiarEstilo }) => {
  const [showSubMenu1, setShowSubMenu1] = useState(false);
  const [showSubMenu2, setShowSubMenu2] = useState(false);
  const [showSubMenu3, setShowSubMenu3] = useState(false);

  if (!open) return null;

  return (
    <>
      {/* Fondo de superposición sin bloquear clics */}
      <div className="fixed inset-0  z-10 pointer-events-none" />

      {/* Contenedor del modal interactivo */}
      <section className="fixed top-4 right-4 w-[35%] max-h-[90vh] bg-black/70 shadow-2xl rounded-2xl z-20">
        {/* Botón para cerrar */}
        <div className="flex justify-end rounded-tl-2xl rounded-tr-2xl bg-black py-2">
          <div className="w-[90%]">
            <h2 className="text-3xl font-bold font-geist text-white text-center">
              Modo Personalizado
            </h2>
          </div>
          <div className="w-[10%]">
            <button
              className=" hover:bg-red-700 px-5 py-1 rounded-md font-bold text-white"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>

        <div className="flex justify-around gap-5 mt-5">
          <button className="bg-gray-500 hover:bg-gray-700 rounded-full font-geist px-5 ">
            Hoy
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 rounded-full font-geist px-3 py-2 ">
            24HRS
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 rounded-full font-geist px-3">
            7DIAS
          </button>
          <FaCalendarAlt className="bg-gray-500 rounded-full text-5xl p-2" />
        </div>

        {/* Contenido del modal */}

        <section className="mt-5 ">
          <div className="mb-3">
            <button
              className={`w-full flex items-center justify-between gap-4 py-2 px-4  bg-green-700 hover:bg-green-800 text-gray-400 font-geist font-semibold transition-colors
                                        `}
              onClick={(e) => {
                e.preventDefault();
                setShowSubMenu1(!showSubMenu1);
              }}
            >
              <span className="flex items-center text-start gap-4">
                <TbCalendarWeek className="font-geist text-2xl text-white " />{" "}
                Dia de la Semana
              </span>
              <RxCaretRight
                className={`font-bold mt-1 ${
                  showSubMenu1 && "rotate-90"
                } transition-all`}
              />
            </button>
            <ul className={`my-2 ${!showSubMenu1 && "hidden"}`}>
              <li className="flex">
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Lu
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Ma
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Mi
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Ju
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Vi
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Sa
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Do
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-3 ">
          <div className="mb-3">
            <button
              className={`w-full flex items-center justify-between gap-4 py-2 px-4  bg-green-700 hover:bg-green-800 text-gray-400 font-geist font-semibold transition-colors
                                        `}
              onClick={(e) => {
                e.preventDefault();
                setShowSubMenu2(!showSubMenu2);
              }}
            >
              <span className="flex items-center text-start gap-4">
                <TbMapSearch  className="font-geist text-2xl text-white " />{" "}
                Análisis por Región
              </span>
              <RxCaretRight
                className={`font-bold mt-1 ${
                  showSubMenu2 && "rotate-90"
                } transition-all`}
              />
            </button>
            <ul className={`my-2 ${!showSubMenu2 && "hidden"}`}>
              <li className="flex">
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Ninguna
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Distrito
                </div>
                
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Municipio
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  // onClick={rutaUnidadEducativaConvenio}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  Provincia
                </div>
              </li>
            </ul>
          </div>
        </section>

        <div className="mt-1 ">
          <div className="mb-3">
            <button
              className={`w-full flex items-center justify-between gap-4 py-2 px-4  bg-green-700 hover:bg-green-800 text-gray-400 font-geist font-semibold transition-colors
                                        `}
              onClick={(e) => {
                e.preventDefault();
                setShowSubMenu3(!showSubMenu3);
              }}
            >
              <span className="flex items-center text-start gap-4">
                <IoLayers className="font-geist text-2xl text-white" /> Capas
              </span>
              <RxCaretRight
                className={` font-bold mt-1 ${
                  showSubMenu2 && "rotate-90"
                } transition-all`}
              />
            </button>
            <ul className={`my-2 ${!showSubMenu3 && "hidden"}`}>
              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => cambiarEstilo("topografico")}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                               `}
                >
                  topográfico
                </div>
              </li>

              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => cambiarEstilo("luciernaga")}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-orange before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                                `}
                >
                  {/* ${location.pathname === '/unidad/educativa/publica'&& 'bg-primary-900/50 rounded-full text-white'} */}
                  Luciérnaga
                </div>
              </li>

              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => cambiarEstilo("calles")}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                                `}
                >
                  {/* ${location.pathname ==='/unidad/educativa/privada'&& 'bg-primary-900/50 rounded-full text-white' } */}
                  calles
                </div>
              </li>
              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => cambiarEstilo("satelite")}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                                `}
                >
                  {/* ${location.pathname ==='/unidad/educativa/privada'&& 'bg-primary-900/50 rounded-full text-white' } */}
                  Satelite
                </div>
              </li>
              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => cambiarEstilo("dark")}
                  className={`py-2 px-6 border-l font-extrabold border-gray-500 ml-6 block relative before:w-3 before:h-3 
                                                before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                                                before:-translate-y-1/2 before:border-4 before:border-black hover:text-white transition-colors
                                                `}
                >
                  {/* ${location.pathname ==='/unidad/educativa/privada'&& 'bg-primary-900/50 rounded-full text-white' } */}
                  Dark
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalMapas;
