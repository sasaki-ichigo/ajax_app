class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content
# boolean型【変数の型】:「真？偽？」って書いてある変数の箱「この箱には真（true）か偽（false）のどちらかの値が入りますよ」な決まり
      t.boolean :checked
      t.timestamps
    end
  end
end