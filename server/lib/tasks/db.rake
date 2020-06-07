namespace :db do
  desc "seeds more players to the dateable"
  namespace :seed do
    task :league, [:number_of_players] => :environment do |task, args|
      args.with_defaults(number_of_players: 10000)

      FactoryBot.create_list(:player, args.number_of_players.to_i)
    end
  end
end
