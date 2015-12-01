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
      query = Riddle::Query.escape(params[:term].to_s)
      cid = Riddle::Query.escape params[:cid].to_s
      sid = Riddle::Query.escape params[:sid].to_s
      page = Riddle::Query.escape params[:p].to_s

      render {} if query.empty?

      result = Product.query(query, cid, sid, page)
      render json: result
    end
  end
end