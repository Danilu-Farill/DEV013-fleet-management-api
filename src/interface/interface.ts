export interface ITrajectories {
    id: number,
    date: string,
    latitude: number,
    longitude: number
}

export interface IQuery {
    take: number | null,
    skip: number | null,
}