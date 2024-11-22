import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EditorPdf = () => {

  const generarPDF = () => {
    
    const doc = new jsPDF();

    // Configurar el contenido del PDF aquí
    doc.setFontSize(12);
    doc.text("Informe", 95, 20);

    // Crear una tabla para los detalles de la factura
    const columns1 = ["Nombre", "Direccion"];
    const data1 = [['NOmbre', 'NOmbre']];

    doc.autoTable({
      startY: 30,
      head: [columns1],
      body: data1,
    });

    const columns2 = ["Historia Unidad Educativa"];
    const data2 = [['NOmbre']];

    doc.autoTable({
      startY: 50,
      head: [columns2],
      body: data2,
    });

    const columns3 = ["Tipo Colegio", "Tipo Turno", "Tipo InfraEstructura"];
    const data3 = [['NOmbre', 'NOmbre', 'NOmbre']];

    doc.autoTable({
      startY: 120,
      head: [columns3],
      body: data3,
    });

    const columns4 = ["Horario", "Numero", "Director"];
    const data4 = [['NOmbre', 'NOmbre', 'NOmbre']];

    doc.autoTable({
      startY: 140,
      head: [columns4],
      body: data4,
    });

    const columns5 = ["Nombre Comida", "Fecha", "Nombre Entrega", "Cantidad"];
    const data5 = [
      ['NOmbre', 'NOmbre', 'NOmbre', 'NOmbre'],
    ];

    doc.autoTable({
      startY: 160,
      head: [columns5],
      body: data5,
    });

    doc.save(`factura_${1}.pdf`);
  };

  return (
    <>
      <button onClick={generarPDF}>Generar PDF</button>
    </>
  );
};

export default EditorPdf;
