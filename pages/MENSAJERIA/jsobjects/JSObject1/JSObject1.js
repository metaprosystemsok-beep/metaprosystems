export default {
  iniciarRefresco: () => {
    setInterval(async () => {
      await Query_tabla_turnos.run();
    }, 5000);
    
    return true;
  }
}