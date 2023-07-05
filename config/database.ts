import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    constructor(private dbUrl: string, private options: mongoose.ConnectOptions) {}

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.dbUrl, this.options);
            console.log('Database connection successful');
        } catch (error) {
            console.error('Database connection error: ' + error);
        }
    }
}

export default Database;
