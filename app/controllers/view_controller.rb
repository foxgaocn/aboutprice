class ViewController < ApplicationController
  before_action :authenticate_user!

  def show
    render params[:id], layout: false
  end

end