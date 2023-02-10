export class UserTask {
    constructor() {
        this.id = undefined;
        this.timeStart = new Date(Date.now());
        this.timeEnd = new Date(Date.now());
        this.description = 'new description';
        this.subject = 'new task';
        this.isCompleted = false;
    }

    public id: number | undefined;
    public timeStart: Date;
    public timeEnd: Date;
    public subject: string;
    public description: string;
    public isCompleted: boolean;
}
