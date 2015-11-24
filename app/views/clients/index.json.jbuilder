json.array!(@clients) do |client|
  json.extract! client, :id, :name, :address, :phone, :sid, :price_unit
  json.url client_url(client, format: :json)
end
