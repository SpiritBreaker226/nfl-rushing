class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :player, limit: 50
      t.string :team, limit: 3
      t.string :pos, limit: 2
      t.integer :att
      t.decimal :attg
      t.integer :yds
      t.decimal :avg
      t.decimal :ydsg
      t.integer :td
      t.string :lng, limit: 4
      t.integer :sortByLng
      t.integer :first
      t.decimal :first_precentage
      t.integer :twenty_plus
      t.integer :fourty_plus
      t.integer :fum

      t.timestamps
    end
  end
end
