class Product < ActiveRecord::Base
  #belongs_to :category
  validates :name, :url, :img, :price, presence: true

  def shop
    SHOP_IDS[shop_id]
  end

  def category
    CATEGORY_IDS[category_id]
  end

  def history_filled
    history || "{\"#{created_at.to_date.to_s}\": #{price}}"
  end

  def price_drop
    return @price_drop if @price_drop
    keys = history_hash.keys
    today_str = defined?(TODAY_STR) ? TODAY_STR : Time.now.to_date.to_s
    if keys.length < 2 || history_hash.keys.last != today_str
      @price_drop = 0 
    else
      @price_drop = history_hash[keys[keys.length-2]] - history_hash[keys[keys.length-1]]
    end
    return @price_drop
  end

  def price_drop_percent
    return 0 if @price_drop == 0
    keys = history_hash.keys
    (price_drop * 1.0) / history_hash[keys[keys.length-1]]
  end


  def self.query(term, cid, sid, page)
    current_page = page || 1
    result = {categories: [], shops: [], products: []}
    
    #always get all the categories
    products = Product.search_for_ids term, 
      :star => true,
      :group_by => :category_id, 
      :order_group_by => 'count(*) desc'
    products.each_with_group_and_count do |prod_id, category_id, count|
      result[:categories] << {id: category_id, name: CATEGORY_IDS[category_id], count: count}
    end

    #get sellers based on categories
    shop_condition = {:group_by => :shop_id, :order_group_by => 'count(*) desc', :star => true,}
    shop_condition[:with] = {:category_id => cid.to_i} unless cid.empty?
    products = Product.search_for_ids term, shop_condition
      
    products.each_with_group_and_count do |prod_id, shop_id, count|
      result[:shops] << {id: shop_id, name: SHOP_IDS[shop_id], count: count}
    end

    #get products based on categories and sellers
    prod_condition = {page: current_page, :star => true, with: {}}
    prod_condition[:with].merge!({:category_id => cid.to_i}) unless cid.empty?
    prod_condition[:with].merge!({:shop_id => sid.split(',').map{|id| id.to_i}}) unless sid.empty?
    products = Product.search term, prod_condition
    products.each do |product|
      result[:products] << {id: product.id, name: product.name, shop: product.shop, url: product.url, price: product.price, img: product.img, history: product.history_filled}
    end

    result
  end

  # [
  #   {"id": 1, "name": "TV", "products":[
  #       {
  #         "id": 2,
  #         "name": "sony",
  #         "price": 23,
  #         "price_change": -12},
  #       {
  #         "id": 4,
  #         "name": "lg",
  #         "price": 33,
  #         "price_change": -22
  #       }
  #     ]},
  #   {"id": 3, "name": "Home", "products":[
  #       {
  #         "id": 2,
  #         "name": "lg",
  #         "price": 23,
  #         "price_change": -12},
  #       {
  #         "id": 4,
  #         "name": "lg",
  #         "price": 33,
  #         "price_change": -22
  #       }
  #     ]}
  # ]
  def self.top10
    tops = Rails.cache.fetch('top10')
    return tops if tops
    tops=[]

    CATEGORY_IDS.keys.map do |cat|
      current = {id: cat, products_by_price: [], products_by_percent: []}
      tops << current
      Product.where(category_id: cat).find_each(batch_size: 1000) do |product|
        put_if_top(current[:products_by_price], 7, product, :price_drop)
        put_if_top(current[:products_by_percent], 3, product, :price_drop_percent)
      end
    end
    Rails.cache.write('top10', tops)
    tops
  end

  private
  def self.put_if_top(target, count, product, criteria)
    return if product.send(criteria) <= 0
    if(target.length < count - 1)
      target << product
    elsif(target.length == count-1)
      target << product
      target.sort!{|a,b| b.send(criteria) <=> a.send(criteria)}
    elsif(target[count-1].send(criteria) < product.send(criteria))
      target[count-1] = product
      target.sort!{|a,b| b.send(criteria) <=> a.send(criteria)}
    end
  end

  def history_hash
    @history ||= history.present? ? JSON.parse(history) : {}
  end
end
