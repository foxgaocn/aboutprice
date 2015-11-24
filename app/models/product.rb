class Product < ActiveRecord::Base
  has_many :prices
  validates :name, :url, presence: true
end
