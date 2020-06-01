class PlayersController < ApplicationController
  def index
    players = Player.search(
      params["name"],
      params["sort_by"],
      params["sort_by_dir"]
    )

    render(
      json: PlayerSerializer.new(players).serializable_hash.to_json,
      status: :ok
    )
  end
end
