class PlayersController < ApplicationController
  def index
    players = Player.all

    render(
      json: PlayerSerializer.new(players).serializable_hash.to_json,
      status: :ok
    )
  end
end
