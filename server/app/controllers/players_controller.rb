class PlayersController < ApplicationController
  include ActionController::MimeResponds

  def index
    if request.format == :json && params["page"].present? == false
      render status: :bad_request
      return
    end

    players = Player.search(
      name: params["name"],
      page: params["page"],
      sort_by: params["sort_by"],
      sort_by_dir: params["sort_by_dir"]
    )
#
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
