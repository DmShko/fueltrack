export interface ActionTracks {
    mode: string
    data: string
    key: string
}

export interface Track {
    fuel: string
    price: string
    kmDay: string
    kmMounth: string
}

export interface TracksInitialState {
    fuelDays: Track []
};