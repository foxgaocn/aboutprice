json.array! @items.keys do |product|
  json.set!(:product_name, product.name)
  json.set!(:product_id, product.id)
  json.set!(:total, @items[product].sum(&:quantity))
  json.details @items[product] do |order_item|
    json.set!(:item_id, order_item.id)
    json.set!(:item_client, order_item.client.name)
    json.set!(:item_quantity, order_item.quantity)
    json.set!(:item_sale_price, "#{order_item.sale_price}#{order_item.client.price_unit_string}")
  end
end 