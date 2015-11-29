class Product < ActiveRecord::Base
  has_many :prices, -> { order "created_at DESC" }
  belongs_to :category
  validates :name, :url, presence: true

  def current_price
    @current_price ||= prices.first.value
  end

end
