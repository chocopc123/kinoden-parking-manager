/**
 * 自鯖を先頭に移動して、他鯖との間に改行用データを仕込む処理
 * @param {FormattedRowData[]} multipleRowData - 複数行データ
 * @returns {PostData[]}
 */
function convertToPostData(multipleRowData) {
  const ownedParking = multipleRowData.filter(
    (rowData) => rowData.serverName === '自鯖'
  );
  const anotherParking = multipleRowData.filter(
    (rowData) => rowData.serverName !== '自鯖'
  );
  /** @type {PostData[]} */
  const postData = [...ownedParking, ...anotherParking];
  postData[ownedParking.length - 1].isIndent = true;

  return postData;
}

/**
 * 停戦時間順にソートを行う処理
 * @param {FormattedRowData[]} multipleRowData - 複数行データ
 * @returns {FormattedRowData[]}
 */
function sortByOpenTime(multipleRowData) {
  // multipleRowDataを停戦時間順に並び替える
  const length = multipleRowData.length;
  let swapped = false;
  do {
    swapped = false;
    for (let i = 0; i < length - 1; i++) {
      if (
        multipleRowData[i].openTime.getHours() >
          multipleRowData[i + 1].openTime.getHours() ||
        (multipleRowData[i].openTime.getHours() ===
          multipleRowData[i + 1].openTime.getHours() &&
          multipleRowData[i].openTime.getMinutes() >
            multipleRowData[i + 1].openTime.getMinutes())
      ) {
        const temp = multipleRowData[i];
        multipleRowData[i] = multipleRowData[i + 1];
        multipleRowData[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return multipleRowData;
}

/**
 * サーバー順にソートを行う処理
 * @param {FormattedRowData[]} multipleRowData - 複数行データ
 * @returns
 */
function sortByServer(multipleRowData) {
  // multipleRowDataをサーバー順に並び替える
  const length = multipleRowData.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < length - 1; i++) {
      if (
        (multipleRowData[i].serverName !== '自鯖' &&
          multipleRowData[i + 1].serverName === '自鯖') ||
        (multipleRowData[i].serverName !== '自鯖' &&
          multipleRowData[i + 1].serverName !== '自鯖' &&
          parseInt(multipleRowData[i].serverName) >
            parseInt(multipleRowData[i + 1].serverName))
      ) {
        const temp = multipleRowData[i];
        multipleRowData[i] = multipleRowData[i + 1];
        multipleRowData[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return multipleRowData;
}
