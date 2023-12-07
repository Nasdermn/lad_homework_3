var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, OneToOne, BaseEntity, Column, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';
let Cart = class Cart extends BaseEntity {
    cart_id;
    user_id;
    user;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cart.prototype, "cart_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Cart.prototype, "user_id", void 0);
__decorate([
    OneToOne(() => User, { onDelete: 'CASCADE' }),
    JoinColumn({
        name: 'user_id',
    }),
    __metadata("design:type", User)
], Cart.prototype, "user", void 0);
Cart = __decorate([
    Entity('carts')
], Cart);
export { Cart };
