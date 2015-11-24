require 'rails_helper'

RSpec.describe "packages/edit", type: :view do
  before(:each) do
    @package = assign(:package, Package.create!(
      :label => "",
      :client => "",
      :user => "",
      :number => "MyString"
    ))
  end

  it "renders the edit package form" do
    render

    assert_select "form[action=?][method=?]", package_path(@package), "post" do

      assert_select "input#package_label[name=?]", "package[label]"

      assert_select "input#package_client[name=?]", "package[client]"

      assert_select "input#package_user[name=?]", "package[user]"

      assert_select "input#package_number[name=?]", "package[number]"
    end
  end
end
