require 'rails_helper'

RSpec.describe "Players", type: :request do
  describe 'GET /players' do
    context 'get the first page of players' do
      before(:each) do
        create_list(:player, 10)

        get '/players?page=1'
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

    context 'search for name Michelle and get the first page' do
      it 'returns all players and status code 200' do
        create_list(:player, 11, player: "Michelle #{Faker::Name.last_name}")

        get "/players?name=michelle&page=1"

        json = JSON.parse(response.body)

        expect(json).not_to be_empty
        expect(json['data'].count).to eq(10)
        expect(response).to have_http_status(200)
      end

      context 'when Michelle is not found' do
        it 'returns status code 200 with an empty array' do
          get "/players?name=Michelle&page=1"

          json = JSON.parse(response.body)

          expect(json['data']).to be_empty
          expect(response).to have_http_status(200)
        end
      end
    end

    context 'when sorting' do
      before(:each) do
        @test_player = create(
          :player,
          player: "Michelle #{Faker::Name.last_name}",
          yds: 11,
          td: -20
        )

        create_list(:player, 10)
      end

      it 'sort by Yds on all players' do
        get "/players?sort_by=yds&sort_by_dir=desc&page=1"

        json = JSON.parse(response.body)

        expect(
          json['data'].first['attributes']['player']
        ).to eq(@test_player['player'])

        expect(response).to have_http_status(200)
      end

      it 'sort by TD on players name Michelle' do
        get "/players?name=michelle&sort_by=yds&sort_by_dir=desc&page=1"

        json = JSON.parse(response.body)

        expect(
          json['data'].first['attributes']['player']
        ).to eq(@test_player['player'])

        expect(response).to have_http_status(200)
      end
    end

    context 'when doing paginate page' do
      context 'if no page parmas is found for json format response' do
        it 'should send back a 400 error' do
          get '/players'

          expect(response).to have_http_status(400)
        end
      end
    end

    context 'render CSV format' do
      context 'renders status 200' do
        before(:each) do
          create_list(:player, 50)
        end

        it 'export players' do
          get '/players.csv'

          expect(response.header['Content-Type']).to include 'text/csv'
          # 10 for the data and 1 for the header
          expect(response.body.split("\n").count).to eq(51)
          expect(response).to have_http_status(200)
        end

        context 'for search and sorting' do
          it 'export players when filteingplayers name Jeese' do
            create(:player, player: "Jeese #{Faker::Name.last_name}")

            get "/players.csv?name=Jeese"

            res_body = response.body.split("\n")

            expect(response.header['Content-Type']).to include 'text/csv'
            expect(res_body.count).to eq(2)
            expect(res_body.last.include? 'Jeese').to be_truthy
            expect(response).to have_http_status(200)
          end

          it 'export players when sort by td players' do
            create(
              :player, player:
              "Jeese #{Faker::Name.last_name}",
              td: 20,
            )

            get "/players.csv?sort_by=td&sort_by_dir=desc"

            res_body = response.body.split("\n")

            expect(response.header['Content-Type']).to include 'text/csv'
            expect(res_body.count).to eq(52)
            expect(res_body.second.include? 'Jeese').to be_truthy
            expect(response).to have_http_status(200)
          end
        end
      end

      context 'when data is not found' do
        it 'returns status code 200 and empty csv file' do
          get "/players.csv"

          expect(response.header['Content-Type']).to include 'text/csv'
          # header only
          expect(response.body.split("\n").count).to eq(1)
          expect(response).to have_http_status(200)
        end
      end
    end
  end
end
