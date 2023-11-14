import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Account } from './account.entity';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    username: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ForeignKey(() => Account)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    account_id: number;
}