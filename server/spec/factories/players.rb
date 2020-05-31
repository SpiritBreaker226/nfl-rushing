FactoryBot.define do
  factory :player do
    player { Faker::Sports::Football.player }
    team { Faker::Sports::Football.team }
    pos { ['WR', 'P', 'RB'].sample }
    att { Faker::Number.within(range: -10..10) }
    attg { Faker::Number.decimal(l_digits: 2) }
    yds { Faker::Number.within(range: -10..10) }
    avg { Faker::Number.decimal(l_digits: 2) }
    ydsg { Faker::Number.decimal(l_digits: 2) }
    td { Faker::Number.within(range: -10..10) }
    lng { Faker::Number.within(range: -10..10).to_s }
    first { Faker::Number.within(range: -10..10) }
    first_precentage { Faker::Number.decimal(l_digits: 2) }
    twenty_plus { Faker::Number.within(range: -10..10) }
    fourty_plus { Faker::Number.within(range: -10..10) }
    fum { Faker::Number.within(range: -10..10) }
  end
end
