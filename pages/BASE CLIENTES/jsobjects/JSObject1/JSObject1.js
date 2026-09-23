export default {
  obtenerDatosConColor: async () => {
    const datosOriginales = await Select_public_base_clientes1.run();
    
    if (!datosOriginales || !Array.isArray(datosOriginales)) return [];

    const colores =  ["#111827", "#1e3a8a", "#065f46", "#78350f"];
    let grupoIndex = 0;

    return datosOriginales.map((item, index) => {
      // Si cambia el email respecto al anterior, avanzamos al siguiente color
      if (index > 0 && item.email !== datosOriginales[index - 1].email) {
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