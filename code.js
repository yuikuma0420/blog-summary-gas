/* フォームが回答されたら呼ばれる関数 */
function receiveFormData(e) {
  Logger.log(JSON.stringify(e)); // イベントオブジェクトの内容をログに記録

  try {
    if (e && e.namedValues) {
      var answer1 = e.namedValues["要約作成日"][0];
      var answer2 = e.namedValues["ブログタイトル"][0];
      var answer3 = e.namedValues["ブログURL"][0];
      var answer4 = e.namedValues["著者名"][0];
      var answer5 = e.namedValues["投稿日"][0];
      var answer6 = e.namedValues["親ジャンル"][0];
      var answer7 = e.namedValues["子ジャンル"][0];
      var answer8 = e.namedValues["キーワード"][0];
      var answer9 = e.namedValues["要約"][0];
      var answer10 = e.namedValues["感想"][0];
      var answer11 = e.namedValues["アクション"][0];
      var answer12 = e.namedValues["用語解説"][0];
      createMinute(answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10, answer11, answer12);
    } else {
      throw new Error("フォームのデータが無効です");
    }
  } catch (error) {
    Logger.log("エラーが発生しました: " + error.message);
  }
}

/* ブログ要約を作成する関数 */
function createMinute(answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10, answer11, answer12) {
  try {
    // ブログ要約ファイルの作成
    var fileName = (answer1 + " 【" + answer6+ "】" + answer2);
    var minutes = DocumentApp.create(fileName);
    var fileId  = minutes.getId();
    var body = minutes.getBody(); // ブログ要約のドキュメントのボディを取得

    // 本文作成
    body.appendParagraph("要約作成日：" + answer1);

    // // 表を作成し、1行2列のサイズで挿入
    // var tableLeft = body.appendTable();
    // var rowLeft = tableLeft.appendTableRow();
    // rowLeft.appendTableCell("要約作成日：");
    // rowLeft.appendTableCell(answer1);

    // // 表を左寄せに設定
    // tableLeft.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

    body.appendParagraph("ブログ情報").setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph("ブログタイトル：" + answer2);
    body.appendParagraph("ブログURL：" + answer3);
    body.appendParagraph(" ");
    body.appendParagraph("著　者　名：" + answer4);
    body.appendParagraph("投　稿　日：" + answer5);
    body.appendParagraph("ジャンル").setHeading(DocumentApp.ParagraphHeading.HEADING3);
    body.appendParagraph("親ジャンル：" + answer6);
    body.appendParagraph("子ジャンル：" + answer7);
    body.appendParagraph("キーワード：" + answer8);

    body.appendParagraph("要約").setHeading(DocumentApp.ParagraphHeading.HEADING1);    
    body.appendParagraph(answer9);

    body.appendParagraph("感想").setHeading(DocumentApp.ParagraphHeading.HEADING2);    
    body.appendParagraph(answer10);

    body.appendParagraph("アクション").setHeading(DocumentApp.ParagraphHeading.HEADING2);    
    body.appendParagraph(answer11);
    body.appendParagraph(" ");
    body.appendParagraph("---------------------------------------------------------------------------------------------------------------------------");
    body.appendParagraph("用語解説").setHeading(DocumentApp.ParagraphHeading.HEADING3);    
    body.appendParagraph(answer12);


    var file = DriveApp.getFileById(fileId);

    // ファイルを作成するフォルダの場所
    var folder = DriveApp.getFolderById("YOUR_FOLDER_ID_HERE"); // ここにフォルダIDを入れる

    // フォルダに追加
    folder.addFile(file);

    var url = file.getUrl(); // ドキュメントのURLを取得
    return url; // URLを返す

  } catch (error) {
    Logger.log("ドキュメントの作成または保存中にエラーが発生しました: " + error.message);
    return null; // エラーが発生した場合はnullを返す
  }
}