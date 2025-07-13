import Message from "../Datastructure/Message";
import User from "../Datastructure/User";

class Room {
    private id: string;
    private users: User[] = [];
    private messages: Message[] = [];
    
    public constructor() {
        this.id = 'AnIDForASpecificRoomThatShoudlBeRandomlyGenerated';
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public setUsers(users: User[]): void {
        this.users = users;
    }

    public addUser(user: User): void {
        this.users.push(user);
    }

    public removeUser(username: string): void {
        this.users = this.users.filter(user => user.getUsername() != username);
    }

    public getMessages(): Message[] {
        return this.messages;
    }

    public setMessages(messages: Message[]): void {
        this.messages = messages;
    }

    public addMessage(message: Message): void {
        this.messages.push(message);
    }
}

export default Room;