
function parkingNumberSort(parkingInfo) {
  const serverList = [];
  parkingInfo.forEach((rowData) => {
    serverList.push(rowData[1]);
  })
  const uniqueServerList = [...new Set(serverList)];
  const length = uniqueServerList.length;
  // サーバーリスト内で自鯖を先頭にする
  uniqueServerList.forEach((rowData, index) => {
    if(rowData === '自鯖') {
      const temp = uniqueServerList[0];
      uniqueServerList[0] = uniqueServerList[index];
      uniqueServerList[index] = temp;
    }
  });

  // サーバーリストの並び替え
  let swapped;
  do {
    swapped = false;
    for(i=1; i < length - 1; i++){
      if (uniqueServerList[i] > uniqueServerList[i+1]) {
        const temp = uniqueServerList[i];
        uniqueServerList[i] = uniqueServerList[i+1];
        uniqueServerList[i+1] = temp;
        swapped = true
      }
    }
  } while(swapped);

  // サーバーリスト順にpush
  const sortedParkingInfo = [];
  uniqueServerList.forEach((serverName) => {
    const array = [];
    parkingInfo.forEach((rowData) => {
      if (rowData[1] === serverName) {
        array.push(rowData);
      }
    })
    sortedParkingInfo.push(array);
  })

  return sortedParkingInfo;
}

// 停戦時間順にソートを行う
function sortByOpenTime(parkingInfos) {
  // parkingInfosを停戦時間順に並び替える
  const length = parkingInfos.length;
  let swapped;
  do {
    swapped = false;
    for(i=0; i < length - 1; i++) {
      if (parkingInfos[i].openTime.getHours() > parkingInfos[i+1].openTime.getHours() ||
      (parkingInfos[i].openTime.getHours() === parkingInfos[i+1].openTime.getHours() &&
        parkingInfos[i].openTime.getMinutes() > parkingInfos[i+1].openTime.getMinutes())
      ) {
        const temp = parkingInfos[i];
        parkingInfos[i] = parkingInfos[i+1];
        parkingInfos[i+1] = temp;
        swapped = true
      }
    };
  } while(swapped);

  // 自鯖とそれ以外を分離する
  const ownedParking = parkingInfos.filter(parkingInfo => parkingInfo.serverName === '自鯖');
  const anotherParking = parkingInfos.filter(parkingInfo => parkingInfo.serverName !== '自鯖');

  return [...ownedParking, {isIndent: true}, ...anotherParking];
}
