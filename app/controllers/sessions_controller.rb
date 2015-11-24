class SessionsController < Devise::SessionsController  
    respond_to :json

    def destroy
      signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
      set_flash_message :notice, :signed_out if signed_out && is_flashing_format?
      yield if block_given?
      respond_to do |format|
        format.json { render nothing: true}
        format.html{ redirect_to after_sign_out_path_for(resource_name) }
      end
    end
end  