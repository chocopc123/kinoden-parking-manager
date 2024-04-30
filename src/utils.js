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
  const propertyName = isDevelopment() ? 'WEBHOOK_URL_DEV' : 'WEBHOOK_URL_PRD';
  return env(propertyName);
}

// 数字をDate型に整形する処理
/**
 *
 * @param {number} timeNumber - 時間を表す1から6桁の数字
 * @returns {Date}
 */
function formatTime(timeNumber) {
  // 数字を6桁の文字列にする 例: 000001
  const timeString = timeNumber.toString().padStart(6, '0');
  // 6桁の文字列をhours, minutes, secondsに分割
  const hours = parseInt(timeString.slice(0, 2), 10);
  const minutes = parseInt(timeString.slice(2, 4), 10);
  const seconds = parseInt(timeString.slice(4, 6), 10);

  // Date型に設定
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(0);

  return date;
}

/**
 * フォームの行データを整形する処理
 * @param {RowData} rowData - 行データオブジェクト
 * @returns {FormattedRowData}
 */
function formatFormRowData(rowData) {
  const result = {};

  // タイムスタンプをセット
  result.timestamp = rowData.timestamp;
  // サーバー名をセット
  result.serverName =
    rowData.serverName === '自鯖(1487)' ? '自鯖' : rowData.serverName;
  // 駐騎場名をセット
  result.parkingName = rowData.parkingName;
  // Discord通知フラグをセット
  result.notifyDiscord = rowData.notifyDiscord;

  // 免戦終了時間をセット
  if (rowData.openTime || rowData.captureTime) {
    let openTime = new Date();
    // 免戦時間がある場合はそれを設定、奪取時間の場合は4時間加算
    if (rowData.openTime) {
      openTime = formatTime(rowData.openTime);
    } else if (rowData.captureTime) {
      const captureDateTime = formatTime(rowData.captureTime);
      captureDateTime.setHours(captureDateTime.getHours() + 4);
      openTime = captureDateTime;
    }

    // 2時から8時までは休戦期間なので時間を調整
    const openTimeHours = openTime.getHours();
    if (openTimeHours >= 2 && openTimeHours < 8) {
      openTime.setHours(8);
      openTime.setMinutes(0);
      openTime.setSeconds(0);
      openTime.setMilliseconds(0);
    }
    result.openTime = openTime;
  }

  return result;
}
