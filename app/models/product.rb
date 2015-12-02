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
end
