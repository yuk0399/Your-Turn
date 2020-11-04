export function getTodayString() {
    const japanDate = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    var now = new Date(japanDate);
    var month =  ("0"+(now.getMonth()+1)).slice(-2);
    var day =  ("0"+now.getDate()).slice(-2);
    return now.getFullYear() + month + day;
}

export function getTodayStringWithSlash() {
    const japanDate = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    var now = new Date(japanDate);
    var month =  ("0"+(now.getMonth()+1)).slice(-2);
    var day =  ("0"+now.getDate()).slice(-2);
    return now.getFullYear() + "/" + month + "/" + day;
}

export function getNowTimeWithCollon() {
    const japanDate = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
      var now = new Date(japanDate);
      var hour =  ("0"+now.getHours()).slice(-2);
      var min =  ("0"+now.getMinutes()).slice(-2);
      var sec =  ("0"+now.getSeconds()).slice(-2);
      return hour + ":" + min + ":" + sec;
}