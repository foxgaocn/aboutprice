class AddFieldsToProducts < ActiveRecord::Migration
  def change
    add_column :products, :img, :string
    add_column :products, :price, :integer
    add_column :products, :history, :text
    change_column :products, :url, :text
    add_index :products, [:url], unique: true
  end
end
