/**
 * @typedef RowData
 * @property {Date} timestamp - フォーム回答時のタイムスタンプ
 * @property {string | undefined} serverName - サーバー名
 * @property {string | undefined} parkingName - 駐騎場名
 * @property {number | undefined} captureTime - 奪取時間文字列
 * @property {number | undefined} openTime - 免戦終了時間文字列
 * @property {'時間登録して通知する' | '通知のみする' | undefined} notifyDiscord - Discord通知に関する文字列
 */

/**
 * @typedef FormattedRowData
 * @property {timestamp} timestamp - フォーム回答時のタイムスタンプ
 * @property {string | undefined} serverName - サーバー名
 * @property {string | undefined} parkingName - 駐騎場名
 * @property {Date} openTime - 免戦終了時間
 * @property {'時間登録して通知する' | '通知のみする' | undefined} notifyDiscord - Discord通知に関する文字列
 */
