class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def hello
  	render html: "Big Data on the Cloud"
  end

end
