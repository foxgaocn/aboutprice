require 'ffaker'

FactoryGirl.define do
  factory :product do
    name "prod1"
    url FFaker.numerify('aaa##########')
    img "img"
    price 123
    category_id 1
    history ''
  end

end
