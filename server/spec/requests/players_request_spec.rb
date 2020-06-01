require 'rails_helper'

RSpec.describe "Players", type: :request do
  describe 'GET /players' do
    context 'all players' do
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

    context 'search for name Michelle' do
      it 'returns all players and status code 200' do
        create_list(:player, 4, player: "Michelle #{Faker::Name.last_name}")

        get "/players?name=michelle"

        json = JSON.parse(response.body)

        expect(json).not_to be_empty
        expect(json['data'].count).to eq(4)
        expect(response).to have_http_status(200)
      end

      context 'when Michelle is not found' do
        it 'returns status code 200 with an empty array' do
          get "/players?name=Michelle"

          json = JSON.parse(response.body)

          expect(json['data']).to be_empty
          expect(response).to have_http_status(200)
        end
      end
    end
  end
end
