export default {
  actualizarStock: async () => {
    try {
      console.log("¡Se disparó el JS!", ventas_y_finanzas.updatedRow);

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

      // Payload completo con los cálculos matemáticos bien hechos
      const payload = {
        id: filaModificada.id,
        id_productos: filaModificada.id_productos,
        costo: costo,
        transferencia_efectivo: transferencia_efectivo,
        tarjeta_credito: tarjeta_credito,
        stock: Number(filaModificada.stock) || 0
      };

      await Query_cambios_manual.run();
      await Promise.all([
        Api_actualizar_precio_tienda.run(payload),
        Api_actualizar_stock_tienda.run(payload)
      ]);
      await vetas_finanzas_catalo_producto.run();

      showAlert("¡Actualizado con éxito!", "success");

    } catch (error) {
      showAlert("Error: " + error.message, "error");
    }
  }
}