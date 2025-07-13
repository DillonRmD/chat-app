import User from "./User";

class Message {
    public author: User;
    public content: string;

    constructor(content: string, author: User) {
        this.content = content;
        this.author = author;
    }

    public getAuthor(): User {
        return this.author;
    }

    public setAuthor(author: User): void {
        this.author = author;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string): void {
        this.content = content;
    }
}

export default Message;