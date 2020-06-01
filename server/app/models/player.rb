class Player < ApplicationRecord
  def self.search(name = nil, sort_by = nil, sort_by_dir = nil)
    players =
      name.nil? ?
        Player.all
      :
        Player.where("LOWER(player) LIKE ?", "%#{name.downcase}%")

    if sort_by.nil? || players.has_attribute?(sort_by) == false
      players
    else
      if sort_by_dir.nil? == false && sort_by_dir == 'desc'
        players.sort_by(&sort_by.to_sym).reverse
      else
        players.sort_by(&sort_by.to_sym)
      end
    end
  end
end
