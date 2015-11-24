json.array! @items.keys do |client|
  json.set!(:client_id, client.id)
  json.set!(:client_name, client.name)
  json.items @items[client] do |order_item|
    json.set!(:id, order_item.id)
    json.set!(:product_name, order_item.product.name)
    json.set!(:quantity, order_item.quantity)
  end
end 