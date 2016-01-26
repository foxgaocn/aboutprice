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

  def price_was
    @price_was || 0
  end

  def price_drop
    return @price_drop if @price_drop
    keys = history_hash.keys
    today_str = defined?(TODAY_STR) ? TODAY_STR : Time.now.to_date.to_s
    if keys.length < 2 || history_hash.keys.last != today_str
      @price_drop = 0 
    else
      @price_was = history_hash[keys[keys.length-2]]
      @price_drop = history_hash[keys[keys.length-2]] - history_hash[keys[keys.length-1]]
    end
    return @price_drop
  end

  def price_drop_percent
    return 0 if price_drop == 0
    (price_drop * 1.0) / price_was
  end


  def self.query(term, cid, sid, rating, page, min, max)
    current_page = page || 1
    result = {categories: [], shops: [], products: [], range: nil}
    
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

    #get price range
    product_max = Product.search term, :order => 'price DESC', :page => 1, :per_page => 1,  :star => true
    product_min = Product.search term, :order => :price, :page => 1, :per_page => 1,  :star => true
    price_max = (product_max.first.try(:price) || 0)/100
    price_min = (product_min.first.try(:price) || 0)/100
    result[:range] = (price_min..price_max)

    #get products based on categories and sellers
    prod_condition = {page: current_page, :star => true, :order => :price, with: {}}
    prod_condition[:with].merge!({:category_id => cid.to_i}) unless cid.empty?
    prod_condition[:with].merge!({:shop_id => sid.split(',').map{|id| id.to_i}}) unless sid.empty?
    prod_condition[:with].merge!({:rating => rating.split(',').map{|id| id.to_i}}) unless rating.empty?
    prod_condition[:with].merge!({:price => (min..max)}) unless min==0 && max==0
    products = Product.search term, prod_condition
    products.each do |product|
      result[:products] << ProductSerializer.new(product).serializable_hash
    end
    result
  end

  def self.top_products
    tops = Rails.cache.fetch('top_products')
    return tops if tops
    tops=[]

    CATEGORY_IDS.keys.map do |cat|
      current = {id: cat, products_by_price: [], products_by_percent: []}
      tops << current
      Product.where(category_id: cat).find_each(batch_size: 1000) do |product|
        push_by_price(current, 10, product)
        push_by_percentage(current, 10, product)
      end
    end
    Rails.cache.write('top_products', tops)
    tops
  end

  def self.top(category)
    result = {products: []}
    top = top_products.find{|p| p[:id].to_s == category}
    top[:products_by_price].map{|p| result[:products] << ProductSerializer.new(p).serializable_hash}
    top[:products_by_percent].map{|p| result[:products] << ProductSerializer.new(p).serializable_hash}
    result
  end

  def self.top2
    tops = Rails.cache.fetch('top2')
    return tops if tops
    tops = []
    top_products.map do |category|
      obj = {  id: category[:id], 
               name: CATEGORY_IDS[category[:id]]
            }
      if(category[:products_by_price].length > 0)
        product = category[:products_by_price][0]
        obj[:products_by_price] = ProductWithPriceDropSerializer.new(product).serializable_hash
      end

      if(category[:products_by_percent].length > 0)
        product = category[:products_by_percent][0]
        obj[:products_by_percent] = ProductWithPricePercentSerializer.new(product).serializable_hash
      end
      tops << obj if(obj[:products_by_price])
    end
    Rails.cache.write('top2', tops)
    tops
  end


  private
  def self.push_by_price(obj, count, product)
    target = obj[:products_by_price]
    return if product.price_drop <= 0
    if(target.length < count - 1)
      target << product
    elsif(target.length == count-1)
      target << product
      target.sort!{|a,b| b.price_drop <=> a.price_drop}
    elsif(target[count-1].price_drop < product.price_drop)
      target[count-1] = product
      target.sort!{|a,b| b.price_drop <=> a.price_drop}
    end
  end

  def self.push_by_percentage(obj, count, product)
    existing = obj[:products_by_price]
    target = obj[:products_by_percent]
    return if product.price_drop_percent <= 0 || existing.include?(product)
    if(target.length < count - 1)
      target << product
    elsif(target.length == count-1)
      target << product
      target.sort!{|a,b| b.price_drop_percent <=> a.price_drop_percent}
    elsif(target[count-1].price_drop_percent < product.price_drop_percent)
      target[count-1] = product
      target.sort!{|a,b| b.price_drop_percent <=> a.price_drop_percent}
    end
  end

  def history_hash
    @history ||= history.present? ? JSON.parse(history) : {}
  end
end
