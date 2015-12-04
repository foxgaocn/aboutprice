task :top10 => :environment do
  Rails.cache.delete('top10')
  Product.top10
end