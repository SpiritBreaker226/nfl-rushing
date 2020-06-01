require 'rails_helper'

RSpec.describe "Players", type: :request do
  describe 'GET /players' do
    before(:each) do
      create_list(:player, 10)

       get '/players'
    end

    it 'returns players' do
      json = JSON.parse(response.body)

      expect(json).not_to be_empty
      expect(json['data'].count).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
