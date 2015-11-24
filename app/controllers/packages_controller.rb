class PackagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_package, only: [:show, :edit, :update, :paid]

  # GET /packages
  # GET /packages.json
  def index
    @packages = Package.query(query_params)
  end

  # GET /packages/1
  # GET /packages/1.json
  def show
  end

  # GET /packages/new
  def new
    @package = Package.new
  end

  # GET /packages/1/edit
  def edit
  end

  # POST /packages
  # POST /packages.json
  def create
    @package = Package.build_package(package_params)

    render nothing: true, status: :ok
  end

  # PATCH/PUT /packages/1
  # PATCH/PUT /packages/1.json
  def update
    respond_to do |format|
      if @package.update(package_params)
        format.html { redirect_to @package, notice: 'Package was successfully updated.' }
        format.json { render nothing: true, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @package.errors, status: :unprocessable_entity }
      end
    end
  end

  def paid
    @package.paid!
    render nothing: true, status: :ok
  end

  # DELETE /packages/1
  # DELETE /packages/1.json
  def destroy
    @package.destroy
    respond_to do |format|
      format.html { redirect_to packages_url, notice: 'Package was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def next_label
    render json: Package.next_label(current_user.id, params[:client_id])
  end  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_package
      @package = Package.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def package_params
      #{"package":{"items":[{"id":5,"quantity":2},{"id":2,"quantity":1},{"id":7,"quantity":3}],"label":"王宝强-0001","number":1,"shipping_fee":2143,"tracking":"234343"}}
      all = params.require(:package).permit(:client_id, :number, :tracking, :shipping_fee, :status, :items=>[:id, :quantity], )
      all.merge!(user_id: current_user.id)
      all
    end

    def query_params
      params.permit(:client_id, :status, :date).merge(user_id: current_user.id)
    end
end
