Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  # 既読機能のエンドポイントをpathパラメーターを使用して記述
  get 'posts/:id', to: 'posts#checked'
end