export type MovieTypes = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

export interface MovieAPITypes {
    Search: MovieTypes[]
    totalResults: string
    Response: string
}
