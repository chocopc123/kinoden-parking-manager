// スクリプトプロパティから値を取得する処理
function env(propertyName) {
  return PropertiesService.getScriptProperties().getProperty(propertyName);
}

// 実行環境が開発環境か本番環境か判定する処理
function isDevelopment() {
  const scriptUrl = ScriptApp.getService().getUrl();
  return scriptUrl.endsWith('/dev');
}

// 実行環境によってWEBHOOK URLを取得する処理
function getWebhookUrl() {
  const propertyName = isDevelopment() ? 'WEBHOOK_URL_DEV' : 'WEBHOOK_URL_PRD'
  return env(propertyName);
}

// 数字をDate型に整形する処理
function formatTime(number){
  // 数字を4桁の文字列にする 例: 0001
  const timeString = number.toString().padStart(4, '0');
  // 4桁の文字列をhoursとminutesに分割
  const hours = parseInt(timeString.slice(0, 2), 10);
  const minutes = parseInt(timeString.slice(2), 10);

  // Date型に設定
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date;
}

// データを出力する形に整形する処理
function formatFormAnswerData(rowData){
  const result = {};

  // 免戦終了時間をセット
  if (rowData.openTime || rowData.captureTime) {
    let openTime;
    // 免戦時間がある場合はそれを設定、奪取時間の場合は4時間加算
    if (rowData.openTime) {
      openTime = formatTime(Number(rowData.openTime));
    } else if (rowData.captureTime) {
      const captureDateTime = formatTime(Number(rowData.captureTime));
      captureDateTime.setHours(captureDateTime.getHours() + 4);
      openTime = captureDateTime;
    }

    if (openTime) {
      // 2時から8時までは休戦期間なので調整
      const openTimeHours = openTime.getHours();
      if (openTimeHours >= 2 && openTimeHours < 8) {
        openTime.setHours(8);
        openTime.setMinutes(0);
      }
      result.openTime = openTime;
    }
  }
  // サーバー名をセット
  if (rowData.serverName) {
    result.serverName = rowData.serverName === '自鯖(1487)' ? '自鯖' : rowData.serverName;
  }
  // Discord通知フラグをセット
  if (rowData.notifyDiscord) {
    result.notifyDiscord = rowData.notifyDiscordFlag !== '' ? true : false;
  }
  // 駐騎場名をセット
  if (rowData.parkingName) {
    result.parkingName = rowData.parkingName;
  }

  return result;
}
