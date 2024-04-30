// 自鯖を先頭に移動して、他鯖との間に改行用データを仕込む処理
function moveTopOwnServer(parkingInfos) {
  const ownedParking = parkingInfos.filter(
    (parkingInfo) => parkingInfo.serverName === '自鯖'
  );
  const anotherParking = parkingInfos.filter(
    (parkingInfo) => parkingInfo.serverName !== '自鯖'
  );

  return [...ownedParking, { isIndent: true }, ...anotherParking];
}

// 停戦時間順にソートを行う処理
function sortByOpenTime(parkingInfos) {
  // parkingInfosを停戦時間順に並び替える
  const length = parkingInfos.length;
  let swapped;
  do {
    swapped = false;
    for (i = 0; i < length - 1; i++) {
      if (
        parkingInfos[i].openTime.getHours() >
          parkingInfos[i + 1].openTime.getHours() ||
        (parkingInfos[i].openTime.getHours() ===
          parkingInfos[i + 1].openTime.getHours() &&
          parkingInfos[i].openTime.getMinutes() >
            parkingInfos[i + 1].openTime.getMinutes())
      ) {
        const temp = parkingInfos[i];
        parkingInfos[i] = parkingInfos[i + 1];
        parkingInfos[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  // 自鯖情報を上部に移動して返却
  return moveTopOwnServer(parkingInfos);
}

// サーバー順にソートを行う処理
function sortByServer(parkingInfos) {
  // parkingInfosをサーバー順に並び替える
  const length = parkingInfos.length;
  let swapped;
  do {
    swapped = false;
    for (i = 0; i < length - 1; i++) {
      if (
        (parkingInfos[i].serverName === '自鯖' &&
          parkingInfos[i + 1] !== '自鯖') ||
        parkingInfos[i].serverName > parkingInfos[i + 1].serverName
      ) {
        const temp = parkingInfos[i];
        parkingInfos[i] = parkingInfos[i + 1];
        parkingInfos[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  // 自鯖情報を上部に移動して返却
  return moveTopOwnServer(parkingInfos);
}
