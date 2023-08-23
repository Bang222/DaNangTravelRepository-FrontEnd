export interface userDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    sex: string;
    isEmailValidated: boolean;
    address: string;
    phone: string;
    createdTime: Date;
    profilePicture: string;
    role: string;
}
export interface commentDTO {
    id:string
    content:string
    createdAt:Date
    userId:string
    experienceId:string
    user:userDTO
}
export interface userExperience{
    id:string
    content:string
    upVote:string[]
    status:string
    imgUrl:string
    userId:string
    title:string
    comments: commentDTO[]
    user: userDTO
}
export interface createExperienceCommentDTO{
    experienceId:string
    userId:string
    content:string
    id:string
    createdAt:Date
}