task :top => :environment do
  Rails.cache.delete('top_products')
  Rails.cache.delete('top2')
  Product.top2
end