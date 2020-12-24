class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    # createメソッド:newとsaveを同時に行う
    post = Post.create(content: params[:content], checked: false)
    # render json:{ post: post }でJSON形式（データ）としてmemo.jsに返却
    # renderメソッド:レスポンスの出力をしてくれるメソッド
    # ユーザーへのレスポンスとして送信すべき内容を指定することができる
    # createアクションが呼び出された際に{ post: post }の値をjson形式で出力
    render json:{ post: post }
  end
  # checkedアクション:「既読」の操作を行ったときに実行されるアクション
  def checked
    # ルーティングで設定したURLパラメーター（get 'posts/:id', to: 'posts#checked'）
    # から、既読したメモのidが渡されるように設定するので、
    # そのidを使用して該当するレコードを取得
    # checked.jsのXHR.send();で送られてきたid
    post = Post.find(params[:id])
    # if文でpost.checkedという既読であるか否かを判定するプロパティを指定
    # 既読であれば「既読を解除するためにfalseへ変更」
    # 既読でなければ「既読にするためtrueへ変更」
    # updateというActiveRecordのメソッドを使用して更新
    # updateメソッド:すでにテーブルに保存されているデータを新しい情報に更新するメソッド
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    # 更新したidのレコード1行分を再取得しitemに代入
    item = Post.find(params[:id])
    # render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却
    # renderメソッド:レスポンスの出力をしてくれるメソッド
    # ユーザーへのレスポンスとして送信すべき内容を指定することができる
    # checkedアクションが呼び出された際に{ post: item }の値をjson形式で出力
    render json:{ post: item }
  end

end