# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_31_211424) do

  create_table "players", force: :cascade do |t|
    t.string "player", limit: 50
    t.string "team", limit: 3
    t.string "pos", limit: 2
    t.integer "att"
    t.decimal "attg"
    t.integer "yds"
    t.decimal "avg"
    t.decimal "ydsg"
    t.integer "td"
    t.string "lng", limit: 4
    t.integer "sortByLng"
    t.integer "first"
    t.decimal "first_precentage"
    t.integer "twenty_plus"
    t.integer "fourty_plus"
    t.integer "fum"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
