class ProductWithPricePercentSerializer < ActiveModel::Serializer
  attributes :id, :url, :img, :price_drop_percent, :name, :price, :price_was
end
