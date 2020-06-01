class Player < ApplicationRecord
  def self.search(name = nil)
    return Player.all if name.nil?

    Player.where("LOWER(player) LIKE ?", "%#{name.downcase}%")
  end
end
