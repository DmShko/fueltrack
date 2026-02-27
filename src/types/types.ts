export interface ActionTracks {
    mode: string
    data: {id: string, value: boolean}
}

export interface ActionCollabsData {
    id: string
    value: boolean
}

export interface ActionCollabs {
    mode: string
    data: ActionCollabsData
}

export interface ActionCollabsDayData {
    id: string
    value: Track
}

export interface ActionCollabsDay {
    mode: string
    data: ActionCollabsDayData
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
    burn: string
    date: string
    selected: boolean
}

export interface Collab {
    _id: string
    name: string
    liters: string
    marck: string
    price: string
    km: string
    pay: PayType
    burn: string
    date: string
    email: string
    verify: boolean
    selected: boolean
    isCatch: boolean
}

export interface TrackModalProps {
    openClose: Function
};

export interface AddTrackArgs {
    data: Track
    token: string
};

export interface DeleteTrackArgs {
    id: string
    token: string
};

export interface GetTrackByIdArgs {
    id: string
    token: string
};

export interface GetCollabsByIdArgs {
    id: string
    token: string
};

export interface GetTrackArgs {

    token: string
};

export interface GetTracksCollabArgs {

    token: string
    owner: string
};

export interface PutTrackArgs {
    id: string
    token: string
    data: Track
};

export interface addTrackInitialState {
    isLoading: boolean
    isAdd: boolean
    error: string
};

export interface deleteTrackInitialState {
    isLoading: boolean
    isDeleted: boolean
    error: string
};

export interface patchTrackInitialState {
    isLoading: boolean
    error: string
};

export interface getTrackInitialState {

    fuelDays: Track []
    selectedDay: Track
    isLoading: boolean
    error: string
    token: string
}; 

export interface getTracksCollabsInitialState {

    fuelCollabDays: Track []
    selectedCollabDay: Track
    isLoading: boolean
    error: string

}

export interface getTrackByIdInitialState {

    dayById: Track
    isLoading: boolean
    error: string
    token: string
};

export interface getCollabsByIdInitialState {

    collabsById: Collab[]
    isLoading: boolean
    error: string
    token: string
    caught: {}
};

export interface TracksInitialState {
   
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
export interface NewDateType {
    timedata: string
    datedata: string
    yeardata: number
    dateSeconds: string
};

export interface ModalPropsTypes {
    elementName: Track | undefined
    buttonName: string
    value: Date | null | [Date | null, Date | null]
    selectedId: string
}