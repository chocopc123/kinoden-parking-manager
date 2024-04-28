const SHEET_ID = env('SHEET_ID');

function updateParkingInfoSheet() {
  const spreadSheet = SpreadsheetApp.openById(SHEET_ID);
  // フォーム回答のシート
  const formAnswerSheet = spreadSheet.getSheets()[0];
  // 駐騎場状況のシート
  const parkingInfoSheet = spreadSheet.getSheets()[1];

  // フォーム回答シートの最終行のデータを取得
  const lastRowNumber = formAnswerSheet.getLastRow();
  const lastRowData = getRowData(formAnswerSheet, lastRowNumber);
  const formattedLastRowData = formatFormAnswerData(lastRowData);

  // 取得したデータを駐騎場状況シートに反映する
  const targetParkingRowNumber = parkingInfoSheet.createTextFinder(formattedLastRowData.parkingName).findNext().getRow();
  setRowData(parkingInfoSheet, targetParkingRowNumber, formattedLastRowData);

  // フォームでチェックを入れた場合のみ通知を送信する
  if(formattedLastRowData.notifyDiscord) {
    pushDiscordNotice();
  }
}

// Discordに通知を送信する
function pushDiscordNotice() {
  const spreadSheet = SpreadsheetApp.openById(SHEET_ID);
  // 駐騎場状況のシート
  const parkingInfoSheet = spreadSheet.getSheets()[1];
  // 駐騎場状況シートの全行データを取得
  const parkingInfoAllData = getMultipleRowData(parkingInfoSheet, 2, 13);
  // 停戦時間順に並び替える
  const sortedParkingInfoData = sortByOpenTime(parkingInfoAllData);

  let postMessage = '';
  sortedParkingInfoData.forEach((parkingInfo) => {
    if (parkingInfo.isIndent) {
      postMessage += '\n';
      return;
    }
    const openTime = parkingInfo.openTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const parkingNumber = parkingInfo.parkingName.split('越域駐騎場')[1]
    postMessage += `${parkingInfo.serverName}-${parkingNumber}-${openTime}\n`;
  })
  postMessage += '=============='

  const payload = {
    username: "ランプの女神",
    content: postMessage,
  };

  const WEBHOOK_URL = getWebhookUrl();
  UrlFetchApp.fetch(WEBHOOK_URL, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
  });
}

// function parkingInfoSheetManualUpdate() {
//   for(i=63; i<=74; i+=1) {
//     updateParkingInfoSheet(i);
//   }
// }
