task :add_a_shop => :environment do
  Shop.create!(id: 6, name: "officeworks")
end