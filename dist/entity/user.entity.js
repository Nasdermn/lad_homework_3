var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity.js';
let User = class User extends BaseEntity {
    user_id;
    firstname;
    lastname;
    email;
    password_hash;
    role_id;
    role;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "user_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], User.prototype, "role_id", void 0);
__decorate([
    ManyToOne(() => Role, { onDelete: 'CASCADE' }),
    JoinColumn({
        name: 'role_id',
    }),
    __metadata("design:type", Role)
], User.prototype, "role", void 0);
User = __decorate([
    Entity('users')
], User);
export { User };
