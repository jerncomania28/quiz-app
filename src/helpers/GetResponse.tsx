import { getAllUsers } from "../utils/firebase";


export async function getResponse() {
    const response = await getAllUsers("users");
    return response
}
