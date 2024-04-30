export interface ITrajectories {
    id: number,
    date: string,
    latitude: number,
    longitude: number
}

export interface IQuery {
    // id: number,
    // taxi_id: number,
    // date: number,
    // latitude: number,
    // longitude: number
    take: number | null,
    skip: number | null,
}