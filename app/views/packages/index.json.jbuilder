json.array!(@packages) do |package|
  json.extract! package, :id, :label, :total_amount
  json.items package.order_items do |item|
    json.set!(:quantity, item.quantity)
    json.set!(:name, item.product.name)
  end

end
