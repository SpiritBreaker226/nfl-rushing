Rails.application.routes.draw do
  resources :players, only: [:index], defaults: { format: :json }
end
