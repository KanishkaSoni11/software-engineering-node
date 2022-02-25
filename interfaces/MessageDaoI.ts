
import Messages from "../models/messages/Messages";

export default interface MessageDaoI{
    userSendsMessage(uid: string, uid1: string, message: Messages) : Promise<Messages[]>;
    userDeletesMessage(uid: string, uid1: string) : Promise<any>;
    findSentMessages(uid: string): Promise<Messages[]>;
    findRecdMessages(uid: string): Promise<Messages[]>;

}