import moment from "moment";

export default function ConvertTime(dataInput: string){
    return moment(dataInput).format("llll")
}