require 'rails_helper'

RSpec.describe "packages/new", type: :view do
  before(:each) do
    assign(:package, Package.new(
      :label => "",
      :client => "",
      :user => "",
      :number => "MyString"
    ))
  end

  it "renders new package form" do
    render

    assert_select "form[action=?][method=?]", packages_path, "post" do

      assert_select "input#package_label[name=?]", "package[label]"

      assert_select "input#package_client[name=?]", "package[client]"

      assert_select "input#package_user[name=?]", "package[user]"

      assert_select "input#package_number[name=?]", "package[number]"
    end
  end
end
