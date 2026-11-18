export default {
    guardarOActualizar: async () => {
        try {
            if (appsmith.store.modoEdicion) {
                // Si es un renglón existente, actualiza por el ID
                await ventas_finanzas_update.run();
                showAlert("¡Cambios guardados con éxito!", "success");
                await ventas_finanzas_catalo_product.run();
                closeModal("Modal1");
            } else {
                // Validación segura: si el Input3 está vacío, es null o no tiene un número válido
                if (Input3.text === undefined || Input3.text === null || String(Input3.text).trim() === "") {
                    showAlert("Atención: Completa el ID para poder guardar.", "warning");
                    return; 
                }

                // Si tiene datos, ejecuta el insert de forma normal
                await ventas_finanzas_insert.run();
                
                showAlert("¡Producto agregado con éxito!", "success");
                await ventas_finanzas_catalo_product.run();
                closeModal("Modal1");
            }

        } catch (error) {
            showAlert("Error al guardar: " + error.message, "error");
        }
    },

    guardarYEnviar: async () => {
        await this.guardarOActualizar();
        await JS_envia_tienda.enviarATienda();
    }
}