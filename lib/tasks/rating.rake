task :rating => :environment do
  Product.find_each(batch_size: 1000) do |product|
    history = JSON.parse(product.history || '{}')
    product.update(rating: rating(history))
  end
end

def rating(history)
  return 3 if history == nil
  return 3 if history.length == 0

  values = history.values.uniq
  return 3 if values.length == 1

  current = values.last
  values = values.sort
  
  if values.length == 2
    return 4 if values.index(current) == 0
    return 2
  end

  if values.length == 3
    return 5 if values.index(current) == 0
    return 3 if values.index(current) == 1
    return 2
  end

  return 5 if values.index(current) == 0
  return 4 if values.index(current) == 1
  return 1 if values.index(current) == (values.length - 1)
  return 2 if values.index(current) == (values.length - 2)
  return 3
end