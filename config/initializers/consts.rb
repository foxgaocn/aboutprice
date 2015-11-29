SHOP_IDS = Shop.all.inject({}){|hash, s| hash.merge({s.id => s.name})}
CATEGORY_IDS = Category.all.inject({}){|hash, s| hash.merge({s.id => s.name})}