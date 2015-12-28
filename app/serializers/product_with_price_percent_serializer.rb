class ProductWithPricePercentSerializer < ActiveModel::Serializer
  attributes :id, :url, :img, :price_drop_percent, :name, :price, :price_was, :history, :shop

  def history
    object.history_filled
  end
end
