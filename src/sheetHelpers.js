// シートから指定した行のデータを取得する処理
function getRowData(sheet, rowNumber) {
  const result = {};
  Object.keys(PROPERTY_LIST).forEach((key) => {
    // propertyListのvalueに一致するセルを検索
    const propertyCell = sheet.createTextFinder(PROPERTY_LIST[key]).findNext();
    if (propertyCell) {
      const columnNumber = propertyCell.getColumn();
      const value = sheet.getRange(rowNumber, columnNumber).getValue();
      result[key] = value;
    }
  });

  return result;
}

// シートから複数行のデータを取得する処理
// FIXME: 処理時間が長い
function getMultipleRowData(sheet, start, end) {
  const result = [];
  for (i = start; i <= end; i++) {
    const rowData = getRowData(sheet, i);
    result.push(rowData);
  }
  return result;
}

// 指定した行にデータを保存する処理
function setRowData(sheet, rowNumber, rowData) {
  // FIXME: rowDataを基にforEach回したほうが良さそう
  Object.keys(PROPERTY_LIST).forEach((key) => {
    const propertyCell = sheet.createTextFinder(PROPERTY_LIST[key]).findNext();
    if (propertyCell) {
      const columnNumber = propertyCell.getColumn();
      const targetCell = sheet.getRange(rowNumber, columnNumber);
      targetCell.setValue(rowData[key]);
    }
  });
}
