require 'rails_helper'

RSpec.describe "packages/index", type: :view do
  before(:each) do
    assign(:packages, [
      Package.create!(
        :label => "",
        :client => "",
        :user => "",
        :number => "Number"
      ),
      Package.create!(
        :label => "",
        :client => "",
        :user => "",
        :number => "Number"
      )
    ])
  end

  it "renders a list of packages" do
    render
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "Number".to_s, :count => 2
  end
end
