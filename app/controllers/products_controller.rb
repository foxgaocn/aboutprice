class ProductsController < ApplicationController
  before_action :authenticate_user!
  def suggestions
    suggestiongs = Product.select(:id, :name).where("name ilike ?", "%#{params[:typed]}%").limit(10)
    render json: suggestiongs.to_json
  end

  /# Sample result
    {
      "results": [{
        "category_id": 1,
        "category_name": "Tv",
        "count": 5,
        "product": {
          "name": "sony tv",
          "url": "http://fff",
          "price": 2345
        }
      }, {
        "category_id": 3,
        "category_name": "Home",
        "count": 15,
        "product": {
          "name": "sony vacuum",
          "url": "http://ddd",
          "price": 333
        }
      }]
    }
  #/
  def search
    products = Product.search Riddle::Query.escape(params[:query]), 
      :group_by => :category_id, 
      :order_group_by => 'count(*) desc'
    results = {"results": []}
    products.each_with_group_and_count do |product, group, count|
      
      results["results"] << { "category_id": group, 
                              "category_name": product.category.name
                              "count": count,
                              "product":{
                                "name": product.name,
                                "url": product.url,
                                "price": product.current_price
                              }
                            }
    end
    render json: results
  end

  def create
    @product = ProductsController.new(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to @product, notice: 'product was successfully created.' }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  private 
  def product_params
    params.require(:product).permit(:name).merge(current_user.id)
  end
end