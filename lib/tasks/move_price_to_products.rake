task :move_price => :environment do
  Price.all.group_by(&:product_id).each do |k, v|
    product = Product.find k
    if(v.length == 1)
      product.price = v[0].value
    else
      product.price = v[v.length-1].value
      values = v.reduce([]){|result, p| result << "\"#{p.created_at.to_date.to_s}\":#{p.value}"}
      product.history = "{#{values.join(',')}}"
    end
    product.save!
  end
end