class MainController < ApplicationController
  #before_action :authenticate_user!, except: [:try_it]

  DEMO_USER = 'guest@test.com'

  def home
    render plain: "Under construction"
  end

end