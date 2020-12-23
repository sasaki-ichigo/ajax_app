// checkという関数を定義
function check() {

// document.querySelectorAll("セレクタ名"):引数に渡した指定したセレクタ名を持つ要素すべてを取得
// セレクタ名".post"からHTMLをすべて取得してpostsに代入
// .postには「postsテーブル」の「created_atカラム」「contentカラム」の情報がすべて入っている
// 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");

// 配列(posts)の中の値(value)を取得し表示する
// forEach関数:配列.forEach(function(value){処理の記述})添字0から最後の要素まで繰り返すたびに引数は各要素に置き換えられる
// .postに入っている「postsテーブル」の「contentカラム」「checkedカラム」「created_atカラム」のすべての情報から
// レコードをひとつずつ取り出し、レコードの数だけ表示
  posts.forEach(function (post) {

// 要素.getAttribute('属性名')（※要素から属性名を取り出す）
// postという要素から属性名"data-id(post.id)"を取り出す
// （1回目）イベント発火が起きている要素にdata-load = "true"はまだ追加されていないため、if文の処理は読み込まれずに、post.setAttribute("data-load", "true");に処理が移ります。
// （2回目）イベント発火が起きている要素にdata-load = "true"が追加されているため、post.getAttribute("data-load") != nullの空ではない条件に当てはまり、if文の処理が読み込まれます。その結果、返り値としてreturn null;が返ってきて、処理が止まる流れになります。
    if (post.getAttribute("data-load") != null) {

// return null;によってJavaScriptの処理から抜け出す。エラーが出た場合これ以降に記述されている処理を行わないようにする
      return null;
    }

// setAttributeメソッド:指定した要素上に新しい属性を追加、または既存の属性の値を変更
// 要素.setAttribute(name, value):nameは属性の名前を文字列で指定,valueは属性に設定したい値を指定
// data-checkの属性値にtrueをセット
// （1回目）post.setAttribute("data-load", "true");と記述することで、要素にdata-load = "true"と属性を追加しています。
// （2回目）4~6行目で処理が終わるので、読み込まれません。
    post.setAttribute("data-load", "true");

// クリックすることでイベント発火
// clickイベント:指定された要素がクリックされた時に、イベントが発火する
// addEventListener:イベント発火の際に実行する関数を定義するためのメソッド
// 要素.addEventListener('イベント名', 関数)
// メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {

// 要素.getAttribute('属性名')（※要素から属性名を取り出す）
// postという要素から属性名"data-id(post.id)"を取り出す
// どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");

// エンドポイントを呼び出すためにXMLHttpRequestを使用してHTTPリクエストを行う
// const XHR = new XMLHttpRequest();でオブジェクトを生成
// XMLHttpRequest:Ajaxを可能にするためのオブジェクト:サーバーにHTTPリクエストを非同期で行うことができる
// Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();

// open:XMLHttpRequestで定義されているメソッド:どのようなリクエストをするのかを指定
// 第一引数にはHTTPメソッド:GET
// 第二引数にはパス:/posts/${postId}
// 第三引数には非同期通信であるかをbooleanで記述:true
// boolean型【変数の型】:「真？偽？」って書いてある変数の箱「この箱には真（true）か偽（false）のどちらかの値が入りますよ」な決まり
// openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);

// responseTypeメソッドを使用してレスポンスの形式を指定
// レスポンスのタイプを指定する
      XHR.responseType = "json";

// send:XMLHttpRequestで定義されているメソッド:リクエストを送信できる
// sendでリクエストを送信する
      XHR.send();

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
// XHR.responseでレスポンスされてきたJSONにアクセスできる
// XHR.response.post:posts_controller.rbのcheckedアクションで返却したitemを取得
// レスポンスされたデータを変数itemに代入している
        const item = XHR.response.post;

// 既読であれば
        if (item.checked === true) {

// setAttributeメソッド:指定した要素上に新しい属性を追加、または既存の属性の値を変更
// 要素.setAttribute(name, value):nameは属性の名前を文字列で指定,valueは属性に設定したい値を指定
// data-checkの属性値にtrueをセット
// 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");

// 未読であれば
        } else if (item.checked === false) {

// removeAttributeメソッド　指定した要素から、特定の属性を削除
// 要素.removeAttribute(name, value):nameは属性の名前を文字列で指定,valueは属性に削除したい値を指定
// data-checkは属性ごと削除
// 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
// JavaScriptのコードの方がHTMLコードより先に読み込まれる
// HTMLコードの読み込み後にJavaScriptのコードが実行されるように実装
// loadイベント:ページ全体が全て読み込まれた後にイベント発火する
// addEventListener:イベント発火の際に実行する関数を定義するためのメソッド
// 要素.addEventListener('イベント名', 関数)
// window.addEventListener("load", check);

// setInterval:一定の間隔（時間）ごとに指定した関数などを実行できるメソッド
// setInterval(check, 1000);第一引数に実行する関数を指定し、第二引数に時間（ミリ秒）を指定
setInterval(check, 1000);



// ※<div></div>（←タグ（※divタグ））
// ※<div class="contents" id="apple">りんご</div>（←要素（※タグで囲まれたすべて））
// ※class="contents"（←属性（※クラス属性））

// デバッグして条件分岐の処理を確認
// debugger
// ソースコードに処理を一旦停止させる場所を指定することができる
// ※binding.pryみたいなやつね
// プルダウンメニューが表示される挙動をデバッグ
// index.js
// 省略
//   pullDownButton.addEventListener('click', function() {
//     debugger
// 省略
// ①debuggerを記述
// ②コンソールを開いた状態で、プルダウンメニューを表示するための要素をクリック
// ③挙動が一時停止状態になる（ブラウザに"Paused in debugger"の文字）
// ④"Paused in debugger"の横の"再生ボタン"クリックで解除