class PlayerSerializer
  include FastJsonapi::ObjectSerializer

  attributes(
    :player,
    :team,
    :pos,
    :att,
    :attg,
    :yds,
    :avg,
    :ydsg,
    :td,
    :lng,
    :first,
    :first_precentage,
    :twenty_plus,
    :fourty_plus,
    :fum
  )

  # use rails cache with a separate namespace and fixed expiry
  cache_options store: Rails.cache, namespace: 'fast-jsonapi', expires_in: 1.hour
end
