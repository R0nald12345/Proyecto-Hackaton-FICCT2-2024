import {
    StyleSheet,
    Image,
    View,
    Text,
    Page,
    Document,
  } from "@react-pdf/renderer";
//   import LogoD7 from "../../src/img/Logo.png";
  // import { DataContext } from "../context/DataProvider";
  // import { useContext } from "react";
  
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#E4E4E4",
      padding: 30,
    },
    title: {
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between", // Distribuye los elementos con espacio entre ellos
      alignItems: "center",
      marginBottom: 20, // Ajusta el margen inferior según sea necesario
    },
    section: {
      display: "flex",
      flexDirection: "row",
      margin: 10,
      padding: 10,
    },
    parragraph: {
      fontSize: 12,
      textAlign: "justify",
      lineHeight: 1.5,
      margin: 10,
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
    logo: {
      width: "80px",
      height: "30px",
      objectFit: "contain", // La imagen se ajustará para caber dentro del contenedor
      margin: 3, // Añade un margen derecho de 12 unidades (12 * 4px = 48px)
    },
    gap: {
      marginRight: 12, // Simula un gap de 4 unidades (4 * 4px = 16px)
    },
  
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      backgroundColor: "#f0f0f0",
      padding: 5,
    },
    tableColHeader3: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      backgroundColor: "#f0f0f0",
      padding: 5,
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      padding: 5,
    },
    tableColServicio: {
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      padding: 5,
    },
    tableCol3: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      padding: 5,
    },
    tableCellHeader: {
      margin: "auto",
      fontSize: 12,
      fontWeight: "bold",
    },
    tableCell: {
      margin: "auto",
      fontSize: 12,
    },
  });
  
  export default function Documento({
    
    condicionesActuales,
    especiesRecomendadas,
    epocasPlantacion,
    riesgosIdentificados,
    recomendacionesManejo,
    planMonitoreo,

  }) {
    // } = datoColegio;
    return (
      <Document>
        <Page size={"LETTER"} style={styles.page}>
          <View style={styles.container}>
            {/* <Image src={LogoD7} style={[styles.logo, styles.gap]} /> */}
            <Text style={styles.title}>Informe Unidad Educativa</Text>
            {/* <Image src={LogoD7} style={[styles.logo, styles.gap]} /> */}
          </View>
  
  
          {/* <Text style={styles.parragraph}>Nombre:{nombreUE}</Text>
          <Text style={styles.parragraph}>Dirección:{direccionUE}</Text>
          <Text style={styles.parragraph}>Video:{video}</Text>
          <Text style={styles.parragraph}>Historia:{descripcionHistoria}</Text> */}
  
          <View style={styles.pageNumber}>
            <Text
              render={({ pageNumber, totalPages }) =>
                `${pageNumber}/${totalPages}`
              }
            />
          </View>
  
          <Text style={styles.parragraph}>Detalles:</Text>
          <View style={styles.table}>
            {/* Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tipo Colegio</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tipo Turno</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tipo Infraestructura</Text>
              </View>
             
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Uv</Text>
              </View>
            </View>
            {/* Data Rows */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                {/* <Text style={styles.tableCell}>{tipoColegio}</Text> */}
              </View>
              <View style={styles.tableCol}>
                {/* <Text style={styles.tableCell}>{tipoTurno}</Text> */}
              </View>
              <View style={styles.tableCol}>
                {/* <Text style={styles.tableCell}>{tipoInfraestructura}</Text> */}
              </View>
           
              <View style={styles.tableCol}>
                {/* <Text style={styles.tableCell}>{uv}</Text> */}
              </View>
            </View>
  
            {/* Agrega más filas de datos según sea necesario */}
          </View>
  
          <Text style={styles.parragraph}>Gestión:</Text>
  
          <View style={styles.table}>
            {/* Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader3}>
                <Text style={styles.tableCellHeader}>Horario</Text>
              </View>
              <View style={styles.tableColHeader3}>
                <Text style={styles.tableCellHeader}>Numero</Text>
              </View>
              <View style={styles.tableColHeader3}>
                <Text style={styles.tableCellHeader}>Director</Text>
              </View>
            </View>
            {/* Data Rows */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                {/* <Text style={styles.tableCell}>{horaGestion}</Text> */}
              </View>
              <View style={styles.tableCol3}>
                {/* <Text style={styles.tableCell}>{nroGestion}</Text> */}
              </View>
              <View style={styles.tableCol3}>
                {/* <Text style={styles.tableCell}>{nombreDirectorGestion}</Text> */}
              </View>
            </View>
  
            {/* Agrega más filas de datos según sea necesario */}
          </View>
          <Text style={styles.parragraph}>Servicio Públicos:</Text>
  
          {/* <View style={styles.table}>
            {/* Data Rows */}
            {/* {servicioPublico.map((servicio, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableColServicio}>
                  <Text style={styles.tableCell}>{servicio}</Text>
                </View>
              </View>
            ))} */}
  {/*           
            <View style={styles.tableRow}>
              {/* Puedes agregar más filas de datos aquí si es necesario */}
            {/* </View> */}
  
          {/* </View> */} 
  
  
        </Page>
      </Document>
    );
  }
  