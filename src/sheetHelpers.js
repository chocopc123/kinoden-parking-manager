/**
 * シートから指定した行のデータを取得する処理
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 取得対象のシート
 * @param {number} rowNumber - 行番号
 * @returns {RowData} 行データオブジェクト
 */
function getRowData(sheet, rowNumber) {
  const result = {};
  Object.keys(PROPERTY_LIST).forEach((key) => {
    // propertyListのvalueに一致するセルを検索
    const propertyCell = sheet.createTextFinder(PROPERTY_LIST[key]).findNext();
    if (propertyCell) {
      const columnNumber = propertyCell.getColumn();
      const value = sheet.getRange(rowNumber, columnNumber).getValue();
      result[key] = value === '' ? undefined : value;
    }
  });

  return result;
}

// FIXME: 処理時間が長い
/**
 * シートから複数行のデータを取得する処理
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 取得対象のシート
 * @param {number} startRow - どの行から取得するかを表す番号
 * @param {number} endRow - どの行まで取得するかを表す番号
 * @returns
 */
function getMultipleRowData(sheet, startRow, endRow) {
  const result = [];
  for (i = startRow; i <= endRow; i++) {
    const rowData = getRowData(sheet, i);
    result.push(rowData);
  }
  return result;
}

/**
 * 指定した行にデータを保存する処理
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - 保存対象のシート
 * @param {number} rowNumber - 行番号
 * @param {FormattedRowData} rowData - 行データオブジェクト
 */
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
