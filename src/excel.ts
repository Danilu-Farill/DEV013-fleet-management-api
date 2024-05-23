import XlsxPopulate from "xlsx-populate";

interface TaxisData{
  id: number,
  plate: string
};

export async function createExcel(/*data:TaxisData[]*/) {
  const workbook = await XlsxPopulate.fromBlankAsync();
  workbook.sheet(0).cell("A1").value([//crear la celda completa
    [1, 2],
    ['ID','PLATE'],
    [ 1, 'dyfu'],
    [ 2, 'adios']
  ])
  workbook.toFileAsync("./excelTaxis.xlsx")
};

createExcel();

