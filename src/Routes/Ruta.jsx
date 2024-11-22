import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "../page/Principal";
import MapaPage from "../page/MapaPage";
import MapaConPoligonokml from "../page/MapaConPoligonokml";
import Mapa from "../page/Mapa";
import GenerarPdf from "../Components/GeneradorPDF/GenerarPdf";
// import GenerarPdf from "../Components/GenerarPdf";

const Ruta = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Principal />} />
        {/* <Route path="/mapa" element={<MapaPage/>}/> */}

        <Route path="/mapa" element={<Mapa/>}/>

        {/* <Route path="/mapakml" element={<MapaConPoligonokml/>}/> */}
        {/* <Route path="/mapakml" element={<GenerarPdf/>}/> */}

      </Routes>
    </Router>
  );
};

export default Ruta;