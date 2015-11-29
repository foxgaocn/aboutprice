class MainController < ApplicationController
  #before_action :authenticate_user!, except: [:try_it]

  DEMO_USER = 'guest@test.com'

  def home
  end

end