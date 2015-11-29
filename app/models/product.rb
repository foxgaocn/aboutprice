class Product < ActiveRecord::Base
  #belongs_to :category
  validates :name, :url, :img, :price, presence: true
end
