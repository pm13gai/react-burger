export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface IOrderData {
    createdAt: string,
    ingredients: Array<string>,
    name: string,
    number: number,
    status: string,
    updateddAt: string,
    _id: string
}

export type TFeedMeesage = {
    orders: Array<IOrderData>,
    total: number,
    totalToday: number
};


