class Player < ApplicationRecord
  def self.search(name: nil, page: nil, sort_by: nil, sort_by_dir: nil)
    return nil if sort_by.nil? == false && Player.has_attribute?(sort_by) == false

    order = sort_by_dir || 'asc'
    order_by = sort_by || 'player'

    players =
      name.nil? ?
        Player.all.order(order_by.to_sym => order.to_sym)
      :
        Player
          .where("LOWER(player) LIKE ?", "%#{name.downcase}%")
          .order(order_by.to_sym => order.to_sym)

    page.nil? ? players : players.page(page)
  end

  def self.to_csv(players)
    headers = [
      "Player's Name",
      "Player's team abbreviation",
      "Player's postion",
      'Rushing Attempts',
      'Rushing Attempts Per Game Avg',
      'Total Rushing Yards',
      'Rushing Avg Yards Per Attempt',
      'Rushing Yards Per Game',
      'Total Rushing Touchdowns',
      'Longest Rush',
      'Rushing First Downs',
      'Rushing First Down %',
      'Rushing 20+ Yards Each',
      'Rushing 40+ Yards Each',
      'Rushing Fumbles',
    ]
    attributes = %w{
      player
      team
      pos
      att
      attg
      yds
      avg
      ydsg
      td
      lng
      first
      first_precentage
      twenty_plus
      fourty_plus fum
    }

    CSV.generate(headers: true) do |csv|
      csv << headers

      players.each do |player|
        csv << player.attributes.values_at(*attributes)
      end
    end
  end
end
