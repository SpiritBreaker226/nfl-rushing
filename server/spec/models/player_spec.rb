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

      found_all_joes = Player.search('zoe')

      expect(found_all_joes.count).to eq(2)
    end

    context 'when no players are found' do
      it 'should be an empty array' do
        found_all_joes = Player.search('bob')

        expect(found_all_joes.count).to eq(0)
      end
    end
  end
end
