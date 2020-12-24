// memoという関数を定義
function memo() {

// document.getElementById("id名"):引数に渡した特定のidを持つ要素を取得
// id名"submit"からHTMLを取得してsubmitに代入
  const submit = document.getElementById("submit");

// クリックすることでイベント発火
// clickイベント:指定された要素がクリックされた時に、イベントが発火する
// addEventListener:イベント発火の際に実行する関数を定義するためのメソッド
// 要素.addEventListener('イベント名', 関数)
// (e)はブロック変数みたいなもの:submit.addEventListener("click",までの情報が全部入ってる
  submit.addEventListener("click", (e) => {

// new FormData(フォームの要素):フォームに入力された値を取得できるオブジェクト
    const formData = new FormData(document.getElementById("form"));

// エンドポイントを呼び出すためにXMLHttpRequestを使用してHTTPリクエストを行う
// const XHR = new XMLHttpRequest();でオブジェクトを生成
// XMLHttpRequest:Ajaxを可能にするためのオブジェクト:サーバーにHTTPリクエストを非同期で行うことができる
// Ajaxに必要なオブジェクトを生成している
    const XHR = new XMLHttpRequest();

// open:XMLHttpRequestで定義されているメソッド:どのようなリクエストをするのかを指定
// 第一引数にはHTTPメソッド:POST
// 第二引数にはパス:/posts
// 第三引数には非同期通信であるかをbooleanで記述:true(非同期通信するってこと)
// boolean型【変数の型】:「真？偽？」って書いてある変数の箱「この箱には真（true）か偽（false）のどちらかの値が入りますよ」な決まり
// openでリクエストを初期化する
    XHR.open("POST", "/posts", true);

// responseTypeメソッドを使用してレスポンスの形式を指定
// レスポンスのタイプを指定する
    XHR.responseType = "json";

// send:XMLHttpRequestで定義されているメソッド:リクエストを送信できる
// sendでリクエストを送信する
    XHR.send(formData);

// onload:XMLHttpRequestで定義されているプロパティ:レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
// レスポンスを受け取った時の処理を記述する
    XHR.onload = () => {

// HTTPステータスコードが200以外の場合ifはtrueとなりアラートを表示する処理が行われる
      if (XHR.status != 200) {

// XHR.statusTextによってエラーが生じたオブジェクトに含まれるエラーメッセージが表示される
// レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
        alert(`Error ${XHR.status}: ${XHR.statusText}`);

// return null;によってJavaScriptの処理から抜け出す。エラーが出た場合これ以降に記述されている処理を行わないようにする
// 処理を終了している
        return null;
      }

// itemは、レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;

// listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");

// formTextは、メモの入力フォームをリセットするために取得。この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要がある。ここではリセット対象の要素であるcontentという要素を取得。
      const formText = document.getElementById("content");

// 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;

// listという親要素に対して、insertAdjacentHTMLでHTMLを追加
// 第一引数にafterendを指定することで、親要素listの直後に挿入できる
      list.insertAdjacentHTML("afterend", HTML);

// 「メモの入力フォームに入力されたままの文字」はリセットされる。正確には、空の文字列に上書きされるような仕組み。
      formText.value = "";
    };

// (e)はブロック変数みたいなもの:submit.addEventListener("click",までの情報が全部入ってる
// e.preventDefault();「submitボタンでclickする」というイベントを阻止
// コントローラー側のイベントを阻止してる
    e.preventDefault();
  });
}
// JavaScriptのコードの方がHTMLコードより先に読み込まれる
// HTMLコードの読み込み後にJavaScriptのコードが実行されるように実装
// loadイベント:ページ全体が全て読み込まれた後にイベント発火する
// addEventListener:イベント発火の際に実行する関数を定義するためのメソッド
// 要素.addEventListener('イベント名', 関数)
window.addEventListener("load", memo);




// insertAdjacentHTML
// 指定したHTMLなどを、特定の要素に描画できるメソッド
// 要素.insertAdjacentHTML("第一引数, HTML);
// 第一引数
// beforebegin	要素の直前に挿入
// afterend	要素の直後に挿入
// afterbegin	内部の最初の子要素の前に挿入
// beforeend	内部の最後の子要素の後に挿入

// preventDefault()
// 標準設定されている（Default）イベントを阻止する（prevent）メソッド
// 標準設定されているイベント |挙動
// ---------------------------------------------------
// submitボタンでclickする  |指定先のURLへ画面遷移,データ送信
// チェックボックスでclickする|チェックが入る（外れる）
// ---------------------------------------------------
