class PlayersController < ApplicationController
  def index
    players = Player.search params["name"]

    render(
      json: PlayerSerializer.new(players).serializable_hash.to_json,
      status: :ok
    )
  end
end
