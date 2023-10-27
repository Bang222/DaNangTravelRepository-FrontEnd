export interface StatusCodeDTO {
    statusCode:number,
    message:string
}
export interface DataEditStoreDTO extends StatusCodeDTO{
    name?:string,
    paymentId:string,
}