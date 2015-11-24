json.array!(@packages) do |package|
  json.extract! :id, :label, :total_amount
end
