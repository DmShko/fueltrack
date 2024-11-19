export interface ActionTracks {
    mode: string
    data: string
    key: string
}

export enum PayType {
    own = 'own', 
    company = 'company',
};

export interface Track {
    _id: string
    liters: string
    marck: string
    price: string
    km: string
    pay: PayType
    date: string
}

export interface TrackModalProps {
    openClose: Function
};

export interface AddTrackArgs {
    data: Track
    token: string
};

export interface addTrackInitialState {
    isLoading: boolean,
    error: string,
    token: string,
};

export interface TracksInitialState {
    fuelDays: Track []
    lightMode: LightModeType
    language: LangType
};

export enum LightModeType {
    light = 'light', 
    dark = 'dark',
};

// type for lightMode action argument
export interface LightModeAction {
    data: LightModeType 
};

export enum LangType {
    en = 'En', 
    ua = 'Ua',
};

export interface LangModeAction {
    data: LangType 
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