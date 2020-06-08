FactoryBot.define do
  factory :player do
    transient do
      longest_rush { Faker::Number.within(range: -10..10) }
    end

    player { Faker::Sports::Football.player }
    team { Faker::Sports::Football.team }
    pos { ['WR', 'P', 'RB'].sample }
    att { Faker::Number.within(range: -10..10) }
    attg { Faker::Number.decimal(l_digits: 2) }
    yds { Faker::Number.within(range: -10..10) }
    avg { Faker::Number.decimal(l_digits: 2) }
    ydsg { Faker::Number.decimal(l_digits: 2) }
    td { Faker::Number.within(range: -10..10) }
    lng { [longest_rush.to_s, "#{longest_rush.to_s}T"].sample }
    sortByLng { longest_rush }
    first { Faker::Number.within(range: -10..10) }
    first_precentage { Faker::Number.decimal(l_digits: 2) }
    twenty_plus { Faker::Number.within(range: -10..10) }
    fourty_plus { Faker::Number.within(range: -10..10) }
    fum { Faker::Number.within(range: -10..10) }
  end
end
