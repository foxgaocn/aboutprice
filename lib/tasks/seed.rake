task :create_products => :environment do
    user_id = User.find_by_email('guest@test.com').id
    File.open(File.join(Rails.root, 'db', 'prod.txt')).read.each_line do |line|
      line = line.strip
      next if line == ''
      
      Product.create!({
        name: line.strip,
        user_id: user_id
      });
    end
  end