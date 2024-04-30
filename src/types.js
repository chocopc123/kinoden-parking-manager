/**
 * @typedef RowData
 * @property {Date} timestamp - フォーム回答時のタイムスタンプ
 * @property {string=} serverName - サーバー名
 * @property {string=} parkingName - 駐騎場名
 * @property {number=} captureTime - 奪取時間文字列
 * @property {number=} openTime - 免戦終了時間文字列
 * @property {'時間登録して通知する' | '通知のみする'=} notifyDiscord - Discord通知に関する文字列
 */

/**
 * @typedef FormattedRowData
 * @property {Date} timestamp - フォーム回答時のタイムスタンプ
 * @property {string} serverName - サーバー名
 * @property {string} parkingName - 駐騎場名
 * @property {Date} openTime - 免戦終了時間
 * @property {'時間登録して通知する' | '通知のみする'=} notifyDiscord - Discord通知に関する文字列
 */

/**
 * @typedef PostData
 * @property {Date} timestamp - フォーム回答時のタイムスタンプ
 * @property {string} serverName - サーバー名
 * @property {string} parkingName - 駐騎場名
 * @property {Date} openTime - 免戦終了時間
 * @property {'時間登録して通知する' | '通知のみする'=} notifyDiscord - Discord通知に関する文字列
 * @property {boolean=} isIndent - 改行するか
 */
