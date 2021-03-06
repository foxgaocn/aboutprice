require 'rails_helper'

RSpec.describe "order_items/edit", type: :view do
  before(:each) do
    @order_item = assign(:order_item, OrderItem.create!(
      :product => "",
      :client => "",
      :quantity => "",
      :status => "",
      :buy_price => "",
      :sale_price => "",
      :sale_price_unit => ""
    ))
  end

  it "renders the edit order_item form" do
    render

    assert_select "form[action=?][method=?]", order_item_path(@order_item), "post" do

      assert_select "input#order_item_product[name=?]", "order_item[product]"

      assert_select "input#order_item_client[name=?]", "order_item[client]"

      assert_select "input#order_item_quantity[name=?]", "order_item[quantity]"

      assert_select "input#order_item_status[name=?]", "order_item[status]"

      assert_select "input#order_item_buy_price[name=?]", "order_item[buy_price]"

      assert_select "input#order_item_sale_price[name=?]", "order_item[sale_price]"

      assert_select "input#order_item_sale_price_unit[name=?]", "order_item[sale_price_unit]"
    end
  end
end
