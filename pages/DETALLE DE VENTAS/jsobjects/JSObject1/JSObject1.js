export default {
  obtenerDatosConColor: async () => {
    const datosOriginales = await Select_public_detalle_de_ventas1.run();
    
    if (!datosOriginales || !Array.isArray(datosOriginales)) return [];

    const colores =  ["#111827", "#1e3a8a", "#065f46", "#78350f"];
    let grupoIndex = 0;

    return datosOriginales.map((item, index) => {
      // Si cambia el fecha respecto al anterior, avanzamos al siguiente color
      if (index > 0 && item.fecha?.substring(0, 10) !== datosOriginales[index - 1].fecha?.substring(0, 10)) {
        grupoIndex++;
      }
      return {
        ...item,
        // Asignamos el color por bloque de transacción
        colorFila: colores[grupoIndex % colores.length]
      };
    });
  }
}