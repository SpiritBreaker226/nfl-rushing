require 'rails_helper'

RSpec.describe Player, type: :model do
  describe '#search' do
    it 'find all players' do
      create_list(:player, 10)

      all_found = Player.search

      expect(all_found.count).to eq(10)
    end

    context 'when searching for names' do
      before(:each) do
        create_list(:player, 10)
      end

      it 'find all players name Zoe' do
        create_list(:player, 2, player: "Zoe #{Faker::Name.last_name}")

        found_all = Player.search(name: 'zoe')

        expect(found_all.count).to eq(2)
      end

      context 'and when no players are found' do
        it 'should be an empty array' do
          found_all = Player.search(name: 'bob')

          expect(found_all.count).to eq(0)
        end
      end
    end

    context 'when sorting' do
      before(:each) do
        create_list(:player, 10)

        @test_player = create(
          :player,
          player: "Jackie #{Faker::Name.last_name}",
          yds: 11,
          td: -20
        )
      end

      it 'sort by Yds on all players' do
        all_found = Player.search(sort_by: 'yds', sort_by_dir: 'desc')

        expect(all_found.first['player']).to eq(@test_player['player'])
      end

      it 'sort by TD on players name Jackie' do
        all_found = Player.search(sort_by: 'td', sort_by_dir: 'asc')

        expect(all_found.first['player']).to eq(@test_player['player'])
      end

      it 'sort by names names with the same value' do
        @ace_test_player = create(
          :player,
          player: "Ace #{Faker::Name.last_name}",
          yds: 11,
          td: -20
        )

        all_found = Player.search(sort_by: 'yds', sort_by_dir: 'desc')

        expect(all_found.first['player']).to eq(@ace_test_player['player'])
        expect(all_found.second['player']).to eq(@test_player['player'])
      end

      context 'and no sort by direction is set' do
        it 'sort by ascending order by default' do
          all_found = Player.search(sort_by: 'td')

          expect(all_found.first['player']).to eq(@test_player['player'])
        end
      end

      context 'and sort by field does not exist' do
        it 'return nil' do
          all_found = Player.search(sort_by: 'not_a_feild')

          expect(all_found).to be_nil
        end
      end
    end

    context 'when doing pagination' do
      before(:each) do
        create_list(:player, 30)
      end

      context 'and searching for names' do
        it 'find all players name Zoe' do
          create_list(:player, 2, player: "Zoe #{Faker::Name.last_name}")

          page_players = Player.search(page: 1, name: 'zoe')

          expect(page_players.count).to eq(2)
        end
      end

      context 'and when sorting by' do
         it 'sort by td on all players' do
          create_list(:player, 20)
          test_player = create(
            :player,
            player: "Jackie #{Faker::Name.last_name}",
            yds: 11,
            td: -20
          )

          page_players = Player.search(page: 1, sort_by: 'td')

          expect(page_players.first['player']).to eq(test_player['player'])
        end
      end
    end
  end
end
