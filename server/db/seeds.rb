# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

data = JSON.parse(File.read("#{File.dirname(__FILE__)}/../../rushing.json"))

data.each do |attributes|
  Player.create!(
    player: attributes['Player'],
    team: attributes['Team'],
    pos: attributes['Pos'],
    att: attributes['Att'],
    attg: attributes['Att/G'],
    yds: attributes['Yds'],
    avg: attributes['Avg'],
    ydsg: attributes['Yds/G'],
    td: attributes['TD'],
    lng: attributes['Lng'],
    sortByLng: attributes['Lng'],
    first: attributes['1st'],
    first_precentage: attributes['1st%'],
    twenty_plus: attributes['20+'],
    fourty_plus: attributes['40+'],
    fum: attributes['FUM']
  )
end
