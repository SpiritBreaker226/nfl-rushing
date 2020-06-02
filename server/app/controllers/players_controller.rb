class PlayersController < ApplicationController
  include ActionController::MimeResponds

  def index
    players = Player.search(
      params["name"],
      params["sort_by"],
      params["sort_by_dir"]
    )

    respond_to do |format|
      format.json do
        render(
          json: PlayerSerializer.new(players).serializable_hash.to_json,
          status: :ok
        )
      end
      format.csv {
        send_data Player.to_csv(players), filename: "players-#{Date.today}.csv"
      }
    end
  end
end
