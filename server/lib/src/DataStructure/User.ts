class User {
    private id: string;
    private username: string;

    constructor(username: string) {
        this.id = 'TestId';
        this.username = username;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }
}

export default User;