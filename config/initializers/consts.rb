SHOP_IDS = Shop.all.inject({}){|hash, s| hash.merge({s.id => s.name})}
CATEGORY_IDS = Category.all.inject({}){|hash, s| hash.merge({s.id => s.name})}

TODAY_STR = Date.new(2015,11,30).to_date.to_s if Rails.env == "development"
