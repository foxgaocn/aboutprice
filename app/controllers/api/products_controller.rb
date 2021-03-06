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
    def show
      p = Product.find(params[:id])
      render json: ProductSerializer.new(p).to_json
    end

    def search
      query = Riddle::Query.escape(params[:term].to_s)
      cid = Riddle::Query.escape params[:cid].to_s
      sid = Riddle::Query.escape params[:sid].to_s
      rating = Riddle::Query.escape params[:rating].to_s
      page = Riddle::Query.escape params[:p].to_s
      min = Riddle::Query.escape params[:min].to_s
      max = Riddle::Query.escape params[:max].to_s

      if query.empty?
        render json: {} 
        return
      end
      result = Product.query(query, cid, sid, rating, page, min.to_i * 100, max.to_i * 100)
      render json: result
    end

    def top2
      render json: Product.top2.to_json
    end

    def top
      result = Product.top(params[:category])
      render json: result
    end
  end
end