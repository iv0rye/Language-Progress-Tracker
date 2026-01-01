export class Session {
    username: string;
    totalTime: number;
    category: string;
    date: Date;

    constructor() {
        this.username = "";
        this.totalTime = 0;
        this.category = "";
        this.date = new Date();
    }
}