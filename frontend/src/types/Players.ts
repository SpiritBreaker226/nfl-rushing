export interface Player {
  attributes: Stats
}

export interface Stats {
  player: string
  team: string
  pos: string
  att: number
  attg: string
  yds: number
  avg: string
  ydsg: string
  td: number
  lng: number
  first: number
  first_precentage: string
  twenty_plus: number
  fourty_plus: number
  fum: number
}
