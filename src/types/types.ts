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

// modal types

export interface TracksModalProps {
    openClose: Function
    selectedDayDrive: Function
    pillNameReset: Function
  };

// new date types

export interface newDateType {
    timedata: string
    datedata: string
    yeardata: number
    dateSeconds: string
  };