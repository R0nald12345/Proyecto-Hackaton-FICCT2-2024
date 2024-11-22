import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoSantaCruz from "../img/LogoSantaCruz.png";

import incendio1 from "../img/Incendios/incendios1.jpg";
// import inundacion2 from "../img/Inundaciones/inundacion2.jpg";
import inundacion1 from "../img/Inundaciones/inundacion1.jpg";
import servicioPublic1 from "../img/ServicioPublico/servicioPublico1.jpg";

import "@fontsource/geist-mono";
import videoIncendio from "../video/videoIncendio.mp4";
import seguridadCiudadana from "../video/seguridadCiudadana.mp4";

const Principal = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

  const closeDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <>
      <section className="bg-black/90">
        <section className=" w-full  overflow-hidden">
          {/* Video de Fondo */}

          {/* Contenido Principal */}
          <nav className="text-2xl bg-black/80">
            <section className="flex w-[80%] mx-auto">
              {/* Foto */}
              <section className="w-1/3 flex gap-1">
                <img
                  src={LogoSantaCruz}
                  alt="Logo Santa Cruz"
                  className="w-16 h-24 p-2"
                />
                <h3 className="mt-7 font-geist font-bold text-white hover:text-yellow-400">
                  Santa Cruz
                </h3>
              </section>

              <section className="w-2/3">
                <div className="flex justify-around mt-6">
                  <Link className="font-geist font-bold text-white hover:text-yellow-300">
                    Noticias
                  </Link>
                  <Link className="font-geist font-bold text-white hover:text-yellow-300">
                    Acerca de
                  </Link>
                  <Link className="font-geist font-bold text-white hover:text-yellow-300">
                    Ciudadano
                  </Link>

                  {/* Administracion con Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropDown(true)} // Mostrar el dropdown al pasar el mouse
                    onMouseLeave={closeDropDown} // Cerrar el dropdown al salir del área
                  >
                    <button
                      onClick={closeDropDown} // Mostrar/ocultar al hacer clic
                      className="font-geist font-bold text-white hover:text-yellow-300 focus:outline-none"
                    >
                      Administración
                    </button>

                    {openDropDown && (
                      <ul className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20">
                        <li className="px-4 py-2 hover:bg-gray-500">
                          <Link to="/#" className="font-geist">
                            Reforestación
                          </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-500">
                          <Link
                            to="/#"
                            className="font-geist"
                          >
                            Seguridad Ciudadana
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </section>
            </section>
          </nav>

          <div className="h-[90vh] mt-1">
            <video
              className=" w-full h-full object-cover z-0 brightness-50 contrast-125"
              src={seguridadCiudadana}
              autoPlay
              loop
              muted
            />
          </div>
        </section>

        <main className="w-[80%] mx-auto flex gap-5 items-stretch mt-10">
          {/* Inundaciones */}
          <section className="w-1/3 rounded-md bg-black/30 text-center flex flex-col p-3">
            <h4 className="text-center font-geist text-4xl font-bold text-white">
              Inundaciones
            </h4>
            <div className="flex-grow">
              <img
                src={inundacion1}
                className="w-full h-[70%] object-cover rounded-md"
                alt="Inundaciones"
              />
            </div>
            <p className="h-[30%] text-white font-geist text-2xl flex items-center justify-center p-3">
              "Evita tirar basura en calles y drenajes; mantenerlos limpios
              reduce el riesgo de inundaciones y protege a tu comunidad."
            </p>
          </section>

          {/* Incendios */}
          <section className="w-1/3 rounded-md bg-black/30 text-center flex flex-col p-3">
            <h4 className="text-center font-geist text-4xl font-semibold text-white">
              Incendios
            </h4>
            <div className="flex-grow mt-5">
              <img
                src={incendio1}
                className="w-full h-[70%] object-cover rounded-md"
                alt="Incendios"
              />
            </div>
            <p className="h-[30%] text-white font-geist text-2xl flex items-center justify-center p-3">
              "Siempre verifica que los aparatos eléctricos estén en buen estado
              y evita sobrecargar enchufes; la prevención es la clave para
              evitar incendios."
            </p>
          </section>

          {/* Servicios Públicos */}
          <section className="w-1/3 rounded-md bg-black/30 text-center flex flex-col p-3">
            <h4 className="text-center font-geist text-4xl font-semibold text-white">
              Servicios Públicos
            </h4>
            <div className="flex-grow mt-5">
              <img
                src={servicioPublic1}
                className="w-full h-[70%] object-cover rounded-md"
                alt="Servicios Públicos"
              />
            </div>
            <p className="h-[30%] text-white font-geist text-2xl flex items-center justify-center p-3">
              "Usa el agua, la electricidad y el gas con responsabilidad; su
              desperdicio afecta tanto al medio ambiente como a todos los que
              dependen de ellos."
            </p>
          </section>
        </main>

        <section className="w-[90%] mx-auto mt-10 grid grid-cols-4">
          {/* Card 1 */}
          <div className="bg-gray-700 h-96 w-full overflow-hidden relative">
            <img
              src="https://i.pinimg.com/736x/d9/c4/8e/d9c48e2c176964cfbe3226f6484b5bf0.jpg"
              alt="Radar"
              className="w-full h-full b4"
            />
          </div>

          {/* Card 2 */}
          <div className="bg-black text-white p-5 flex flex-col items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/7gnb8e5o/production/175d2ce3679e67e1d33c4a2b6b907c4ca809ff54-107x107.png?w=50&h=50&auto=format"
              alt="Temperature"
              className="w-24 h-14 mb-4"
              style={{ objectFit: "contain" }}
            />

            <h3 className="text-lg font-semibold mb-2">ABUSO</h3>
            <p className="text-center text-sm">
              Debemos finalizar con el abuso hacia las Mujeres.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-700 h-96 w-full overflow-hidden relative">
            <img
              src="https://i.pinimg.com/control2/736x/af/d4/55/afd4556109ac3b44288a4466ccaffc77.jpg"
              alt="Weather Alerts"
              className="w-full h-full mb-4"
            />
          </div>

          {/* Card 4 */}
          <div className="bg-black text-white p-5 flex flex-col items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/7gnb8e5o/production/b82ba676eb13fade4af8e6ceadc376318a02b8ea-107x107.png?w=50&h=50&auto=format"
              alt="Precipitation"
              className="w-16 h-14 mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">DEFORESTACION</h3>
            <p className="text-center text-sm">
              No más deforestación, cuidemos nuestro planeta.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-black text-white p-5 flex flex-col items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/7gnb8e5o/production/6b17bdb941821f9ec5d5395520324088ab50ba55-107x107.png?w=50&h=50&auto=format"
              alt="Hurricane Tracking"
              className="w-16 h-14 mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Medio Ambiente</h3>
            <p className="text-center text-sm">
              Cuidemos nuestro medio ambiente, es el único que tenemos.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-gray-700 h-96 w-full overflow-hidden relative">
            <img
              src="https://i.pinimg.com/736x/f2/81/f5/f281f593e545fa590030c8f46a948941.jpg"
              alt="Weather Forecasts"
              className="w-full h-full mb-4"
            />
          </div>

          {/* Card 7 */}
          <div className="bg-black text-white p-5 flex flex-col items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/7gnb8e5o/production/bd04d01f3b6efb15dd39caa6ed2d9d34793e0c5d-107x107.png?w=50&h=50&auto=format"
              alt="Disaster Warnings"
              className="w-16 h-14 mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Cuidado Familiar</h3>
            <p className="text-center text-sm">
              Cuidemos a nuestra familia, es lo más importante.
            </p>
          </div>

          {/* Card 8 */}
          <div className="bg-gray-700 h-96 w-full overflow-hidden relative">
            <img
              src="https://i.pinimg.com/736x/9a/eb/f0/9aebf0ab72e64b80e5b3b227a4352ac4.jpg"
              alt="Aviation Features"
              className="w-full h-full mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Seguridad Móvil</h3>
            <p className="text-center text-sm">
              Seguridad en tus manos, con nuestra aplicación móvil.
            </p>
          </div>

          {/* Card 9 */}
          <div className="bg-gray-700 h-96 w-full overflow-hidden relative">
            <img
              src="https://i.pinimg.com/736x/82/cd/70/82cd70273ddad08419befd12e11b92c1.jpg"
              alt="Aviation Features"
              className="w-full h-full mb-4"
            />
          </div>

          {/* Card 10 */}
          <div className="bg-black text-white p-5 flex flex-col items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/7gnb8e5o/production/0937446f4107c9edee727fd9ba5f12325a7537c7-107x107.png?w=50&h=50&auto=format"
              alt="Aviation Features"
              className="w-16 h-14 mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Seguridad Móvil</h3>
            <p className="text-center text-sm">
              Seguridad en tus manos, con nuestra aplicación móvil.
            </p>
          </div>

          {/* Card 11 */}
          <div className="bg-gray-700 h-96 w-full overflow-hidden relative">
            <img
              src="https://i.pinimg.com/736x/74/34/b4/7434b498d1d22bd24d3b9f1f6dc0e7eb.jpg"
              alt="Aviation Features"
              className="w-full h-full mb-4"
            />
          </div>

          {/* Card 12 */}
          <div className="bg-black text-white p-5 flex flex-col items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/7gnb8e5o/production/782ba917544c297b07bf789a6f9450a1cccdee72-107x107.png?w=50&h=50&auto=format"
              alt="Aviation Features"
              className="w-16 h-14 mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Violencia Familiar</h3>
            <p className="text-center text-sm">
              No más violencia familiar, denuncia y protege a los tuyos.
            </p>
          </div>

          {/* Card 13 */}
          <div className="bg-black text-white p-5 flex flex-col items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/7gnb8e5o/production/7d69159bb7382f0da9252cb5873c1d8520bed4a6-107x107.png?w=50&h=50&auto=format"
              alt="Aviation Features"
              className="w-16 h-14 mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Cambios Nuevos</h3>
            <p className="text-center text-sm">
              Los cambios son buenos, siempre y cuando sean para mejorar.
            </p>
          </div>

          {/* Card 14 */}
          <div className="bg-gray-700 h-96 w-full overflow-hidden relative">
            <img
              src="https://www.elblogdetubebe.com/wp-content/uploads/2024/01/esquema-del-cambio-climatico-para-ninos.jpg"
              alt="Aviation Features"
              className="w-full h-full mb-4"
            />
          </div>

          {/* Card 15 */}
          <div className="bg-black text-white p-5 flex flex-col items-center justify-center">
            <img
              src="https://cdn.sanity.io/images/7gnb8e5o/production/8a6e02d169e4884dc325d26476a1d22e9066fa64-107x107.png?w=50&h=50&auto=format"
              alt="Aviation Features"
              className="w-16 h-14 mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Protección Datos</h3>
            <p className="text-center text-sm">
              Tus Datos son importantes, protegemos tu privacidad.
            </p>
          </div>

          {/* Card 16 */}
          <div className="bg-gray-700 h-96 w-full overflow-hidden relative">
            <img
              src="https://i.pinimg.com/736x/99/4c/a6/994ca6e100b8c9d89fe3992156dbf7b9.jpg"
              alt="Aviation Features"
              className="w-full h-full mb-4"
            />
          </div>
        </section>

        <footer className="px-10 bg-black mt-12">
          <h4 className="text-white text-2xl font-semibold font-geist py-3">
            Todos los Derechos Reservados <span>©</span>
          </h4>
        </footer>
      </section>
    </>
  );
};

export default Principal;
