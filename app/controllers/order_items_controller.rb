class OrderItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_order_item, only: [:show, :edit, :update, :destroy]

  # GET /order_items
  # GET /order_items.json
  def index
    @grouped_order_items = OrderItem.query(query_params).group_by{|item| item.create_date}
  end

  # GET /order_items/1
  # GET /order_items/1.json
  def show
    @order_item = OrderItem.includes(:product, :client).find(params[:id])
  end

  # GET /order_items/new
  def new
    @order_item = OrderItem.new
  end

  # GET /order_items/1/edit
  def edit
  end

  # POST /order_items
  # POST /order_items.json
  def create
    product_name = order_item_params.delete(:product_name)
    raise 'No product name' if product_name.nil?
    unless(order_item_params[:product_id].present?)
      product = Product.where(name: product_name).try(:first)
      product ||= Product.create!(name: product_name, user_id: current_user.id)
      order_item_params[:product_id] = product.id
    end
    @order_item = OrderItem.new(order_item_params)

    respond_to do |format|
      if @order_item.save
        format.html { redirect_to @order_item, notice: 'Order item was successfully created.' }
        format.json { render nothing: true, status: :ok }
      else
        render json: @order_item.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /order_items/1
  # PATCH/PUT /order_items/1.json
  def update
    respond_to do |format|
      if @order_item.update(order_item_params)
        format.html { redirect_to @order_item, notice: 'Order item was successfully updated.' }
        format.json { render :show, status: :ok, location: @order_item }
      else
        format.html { render :edit }
        format.json { render json: @order_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /order_items/1
  # DELETE /order_items/1.json
  def destroy
    @order_item.destroy
    respond_to do |format|
      format.html { redirect_to order_items_url, notice: 'Order item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def bought
    bought_params.each do |bought|
      order_item = OrderItem.find bought["item_id"]
      order_item.bought!(bought["quantity"], bought["buy_price"])
    end
    render nothing: true, status: :ok 
  end

  def to_be_purchased
    items = OrderItem.includes(:client).where(user_id: current_user.id, status: 0).group_by(&:product_id)
    @items = items.inject ({}){|hash, (k,v)| hash.merge((Product.find k) => v) }
  end

  def to_be_delivered
    items = OrderItem.includes(:client, :product)
      .where(user_id: current_user.id, status: 1)
      .where('quantity > 0')
      .group_by(&:client_id)
    @items = items.inject ({}){|hash, (k,v)| hash.merge((v[0].client) => v) }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order_item
      @order_item = OrderItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def order_item_params
      unless(@order_item_params)
        @order_item_params = params.require(:order_item).permit(:product_name, :product_id, :client_id, :quantity, :status, :sale_price)
        @order_item_params.merge!(user_id: current_user.id)
      end
      @order_item_params
    end

    def bought_params
      params.require(:bought).map do |p|
        ActionController::Parameters.new(p.to_hash).permit(:item_id, :quantity, :buy_price)
      end
    end

    def query_params
      params.permit(:client_id, :status, :date).merge(user_id: current_user.id)
    end
end
