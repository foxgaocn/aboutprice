class ProductsController < ApplicationController
  before_action :authenticate_user!
  def suggestions
    suggestiongs = Product.select(:id, :name).where("name ilike ?", "%#{params[:typed]}%").limit(10)
    render json: suggestiongs.to_json
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