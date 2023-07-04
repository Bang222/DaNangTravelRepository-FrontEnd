import useStorage from "@/components/hooks/UseStorage";

export const Session = async ():Promise<Boolean> => {
    const token = useStorage('token')
    console.log(token)
}
