require 'rails_helper'

RSpec.describe "packages/show", type: :view do
  before(:each) do
    @package = assign(:package, Package.create!(
      :label => "",
      :client => "",
      :user => "",
      :number => "Number"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(//)
    expect(rendered).to match(//)
    expect(rendered).to match(/Number/)
  end
end
