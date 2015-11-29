module Api
  class ProductsController < ApplicationController
    def suggestions
      suggestiongs = Product.select(:id, :name).where("name ilike ?", "%#{params[:typed]}%").limit(10)
      render json: suggestiongs.to_json
    end

    # Sample result
    # {"categories": 
    #   [
    #     {"id":1, "name":"tv", "count":"12"},
    #     {"id":2, "name":"home", "count":"8"}
    #   ],
    #  "shops":
    #   [
    #     {"id":1, "name": "jbhifi", "count": 23},
    #     {"id":3, "name": "goodguy", "count": 21}
    #   ],
    #  "products":
    #   [
    #     {"id":1, name": "fsdf", "url": "dfasf", "price": 123},
    #     {"id",2, name": "fasd", "url": "dfafdsa", "price": 345}
    #   ]
    # }
    
    def search
      query = Riddle::Query.escape(params[:term])
      render {} if query.empty?

      products = Product.search_for_ids query, 
        :group_by => :category_id, 
        :order_group_by => 'count(*) desc'
      result = {categories: [], shops: [], products: []}
      products.each_with_group_and_count do |prod_id, category_id, count|
        result[:categories] << {id: category_id, name: CATEGORY_IDS[category_id], count: count}
      end

      products = Product.search_for_ids query, 
        :group_by => :shop_id, 
        :order_group_by => 'count(*) desc'
      products.each_with_group_and_count do |prod_id, shop_id, count|
        result[:shops] << {id: shop_id, name: SHOP_IDS[shop_id], count: count}
      end

      products = Product.search query
      products.each do |product|
        result[:products] << {id: product.id, name: product.name, url: product.url, price: product.price, img: product.img, history: product.history}
      end

      render json: result
    end
  end
end