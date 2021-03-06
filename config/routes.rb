Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resources :groups, only: [:create, :show, :update, :index, :destroy]
    resources :memberships, only: [:create, :destroy, :index, :show]
    resources :events, only: [:create, :destroy, :index, :show, :update]
    resources :rsvps, only: [:create, :destroy, :index]
    resource :session, only: [:create, :destroy]
  end

  root "static_pages#root"
end
