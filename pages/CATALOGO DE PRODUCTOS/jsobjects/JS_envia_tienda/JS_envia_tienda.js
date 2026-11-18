export default {
  enviarATienda: async () => {
    try {
      const seleccionados = ventas_y_finanzas.selectedRows;

      if (!seleccionados || seleccionados.length === 0) {
        showAlert("Seleccioná al menos un producto para enviar.", "warning");
        return;
      }

      // Ejecutamos la API pasando los datos seleccionados
      await Api_actualizar_stock_tienda.run();

      showAlert("¡Productos enviados a la tienda con éxito!", "success");

    } catch (error) {
      showAlert("Error al enviar: " + error.message, "error");
    }
  }
}