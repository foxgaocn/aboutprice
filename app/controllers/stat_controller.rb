class StatController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_me

  def stat
    user_count = User.count;
    order_count = OrderItem.where(origination_id: nil).count;
    today_user = User.where("created_at > ?", Time.now.beginning_of_day).count
    today_order = OrderItem.where(origination_id: nil).where("created_at > ?", Time.now.beginning_of_day).count
    render plain: "
                   User number: #{user_count} \n
                   Order number: #{order_count} \n
                   New user today: #{today_user}\n
                   New order today: #{today_order} "
  end

  private 
  def ensure_me
    render plain: "sorry" if current_user.email != 'admin@daigouben.com'
  end
end