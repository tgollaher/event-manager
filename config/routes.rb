Rails.application.routes.draw do
  root to: redirect('/events')

  # post '/auth/login', to: 'authentication#login'
  # get '/users/verify', to: 'users#verify'
  get 'events', to: 'site#index'
  get 'events/new', to: 'site#index'
  get 'events/:id', to: 'site#index'
  get 'events/:id/edit', to: 'site#index'
  # resources :users 
  namespace :api do
    resources :events, only: %i[index show create destroy update]
  end
end