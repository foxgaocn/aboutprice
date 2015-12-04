class ProductSerializer < ActiveModel::Serializer
  root false
  attributes :id, :url, :img, :name, :price, :shop, :category, :history
  
  def history
    object.history_filled
  end
end
