class ProductWithPriceDropSerializer < ActiveModel::Serializer
  attributes :id, :url, :img, :price_drop, :name
end
