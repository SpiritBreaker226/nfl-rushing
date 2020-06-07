export interface PlayerQuery {
  page: string
  name?: string
  sort_by?: string
  sort_by_dir?: Direction
}

export interface Sorting {
  fieldName: string | undefined
  dir: Direction
}

export type Direction = 'asc' | 'desc' | undefined
