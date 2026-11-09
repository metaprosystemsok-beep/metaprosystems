export default {
  actualizarStock: async () => {
    try {
      console.log("Se disparó el JS!", ventas_y_finanzas.updatedRow);

      const filaModificada = ventas_y_finanzas.updatedRow;

      if (!filaModificada || !filaModificada.id) {
        showAlert("Fila no detectada o vacía.", "warning");
        return;
      }

      const costo = Number(filaModificada.costo) || 0;
      const porcentaje = Number(filaModificada.porcentaje) || 0;
      const porcentaje_tarjeta = Number(filaModificada.porcentaje_tarjeta) || 0;

      const transferencia_efectivo = Number((costo * (1 + (porcentaje / 100))).toFixed(2));
      const tarjeta_credito = Number((transferencia_efectivo * (1 + (porcentaje_tarjeta / 100))).toFixed(2));

      // Guardamos directamente en la base de datos local de Postgres
      await ventas_finanzas_update.run();
      
      // Ejecutamos los cambios manuales internos si los necesitas
      await Query_cambios_manual.run();

      // Refrescamos la tabla para ver los datos actualizados
      await ventas_finanzas_catalo_product.run();

      showAlert("¡Actualizado en la base de datos con éxito!", "success");

    } catch (error) {
      showAlert("Error: " + error.message, "error");
    }
  }
}