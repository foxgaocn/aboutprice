json.extract! @order_item, :id, :product, :client, :quantity, :sale_price_unit
json.sale_price @order_item.sale_price.to_f
json.buy_price @order_item.buy_price.to_f
json.status OrderItem.statuses[@order_item.status]