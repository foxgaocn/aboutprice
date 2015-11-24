class CreateProducts < ActiveRecord::Migration
  def change
    create_table :shops do |t|
      t.string :name
    end

    create_table :categories do |t|
      t.string :name
    end

    create_table :products do |t|
      t.string :name
      t.text :url
      t.references :category, index: true, default: 0
      t.references :shop, index: true
      t.timestamps null: false
      t.boolean :available
    end

    create_table :prices do |t|
      t.references :product, index: true, default: 0
      t.integer :value
      t.timestamps null: false
    end
  end
end
