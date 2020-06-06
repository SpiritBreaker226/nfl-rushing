require 'rails_helper'

RSpec.describe Player, type: :model do
  describe '#search' do
    it 'find all players' do
      create_list(:player, 10)

      all_found = Player.search

      expect(all_found.count).to eq(10)
    end

    it 'find all players name Zoe' do
      create_list(:player, 2, player: "Zoe #{Faker::Name.last_name}")

      found_all_joes = Player.search(name: 'zoe')

      expect(found_all_joes.count).to eq(2)
    end

    context 'when no players are found' do
      it 'should be an empty array' do
        found_all_joes = Player.search(name: 'bob')

        expect(found_all_joes.count).to eq(0)
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

      context 'and no sort by direction is set' do
        it 'sort by ascending order by default' do
          all_found = Player.search(sort_by: 'td')

          expect(all_found.first['player']).to eq(@test_player['player'])
        end
      end

      context 'and sort by field does not exist' do
        it 'unsorted results' do
          all_found = Player.search(sort_by: 'not_a_feild')

          expect(all_found.last['player']).to eq(@test_player['player'])
        end
      end
    end
  end
end
