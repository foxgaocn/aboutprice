task :init_data, [:folder] => :environment do |t, args|
  Shop.delete_all
  shops = JSON.parse(File.read(File.join(args[:folder], 'scrapper/shops.json')))
  puts "shops are: #{shops}"
  shops.keys.map{ |k| Shop.create(name: k, id: shops[k])}

  Category.delete_all
  categories = JSON.parse(File.read(File.join(args[:folder], 'categorize/category.json')))
  puts "Categories are #{categories}"
  categories.keys.each_with_index{|c, i| Category.create(name: c, id: i+1)}

  puts "#{Shop.count} shops and #{Category.count} categories has been created"
end