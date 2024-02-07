import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, DataType } from 'sequelize-typescript';
import { Account } from './account.entity';

@Table
export class Setting extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.ENUM('string', 'number', 'boolean'),
        allowNull: false,
    })
    data_type: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    value: string;

    @ForeignKey(() => Account)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    account_id: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}