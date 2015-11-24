ThinkingSphinx::Index.define :product, :with => :active_record do
  indexes name
  
  has category_id, shop_id
end