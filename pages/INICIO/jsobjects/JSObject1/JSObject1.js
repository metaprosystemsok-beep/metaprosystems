export default {
  sumarVentas: () => {
    return Table1.tableData.reduce((acc, curr) => acc + parseFloat(curr.total_venta || 0), 0);
  }
}