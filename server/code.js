function doGet() {
    return HtmlService.createHtmlOutputFromFile("hosting/index.html")
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setTitle("Mermaid Live Editor")
}

function getUser(obj){
    let lock = LockService.getScriptLock();
    if (lock.tryLock(50000)) {
        user = getUserMain(obj);
        lock.releaseLock();
    }
    else {
        user['status'] = "error";
        user['message'] = "2重起動によりユーザーを認証できませんでした。";
        console.log("2重起動によりユーザーを認証できませんでした。")
    }
    return user;
}

function getUserMain(obj) {
    const sheetId = obj.sheetId
    const sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty(sheetId)).getSheetByName('ユーザ保存場所')
    let lastRow = sheet.getLastRow()
    let lastColumn = sheet.getLastColumn()
    let values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues()
    let userMailAddress = Session.getActiveUser().getEmail()
    let user = {}
    for (let value of values) {
        if (value[1] === userMailAddress) {
            user['mailAddress'] = userMailAddress
            user['id'] = value[0]
            user['src'] = value[2]
            break
        }
    }
    if (user['mailAddress'] == undefined) {
        user['mailAddress'] = userMailAddress
        user['id'] = lastRow
        user['src'] = ''
        try{
            sheet.getRange(lastRow+1, 1, 1, 4).setValues([[lastRow, userMailAddress, '', 1]])
        }catch(e){
            console.log("メールアドレスを保存できませんでした。")
            user['status'] ="error"
        }
    }
    return user
}

function queryCodeUpdate(obj){
    let lock = LockService.getScriptLock();
    let message = {};
    if (lock.tryLock(50000)) {
        message = queryCodeUpdateMain(obj);
        lock.releaseLock();
    }
    else {
        message['status'] = "error";
        message['message'] = "2重起動によりユーザーを認証できませんでした。";
        console.log("2重起動によりユーザーを認証できませんでした。")
    }
    return message;
}

function queryCodeUpdateMain(obj){
    const sheetId = obj.sheetId
    const sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty(sheetId)).getSheetByName('ユーザ保存場所')
    let returnMessage = {
        status: "success",
        message: "変更が完了いたしました。"
    };
    try{
        let num = sheet.getRange(obj.id+1, 4, 1, 1).getValues()[0][0]
        sheet.getRange(obj.id+1, 3, 1, 2).setValues([[obj.src, num+1]])
    }catch(e){
        returnMessage['status'] = "error";
        returnMessage['message'] = "変更できませんでした。";
        console.log("Error:" + e.message);
    }
    return returnMessage
}