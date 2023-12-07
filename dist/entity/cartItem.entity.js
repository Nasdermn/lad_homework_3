var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity.js';
import { Product } from './product.entity.js';
let CartItem = class CartItem extends BaseEntity {
    item_id;
    cart_id;
    cart;
    product_id;
    product;
    quantity;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CartItem.prototype, "item_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], CartItem.prototype, "cart_id", void 0);
__decorate([
    ManyToOne(() => Cart, { onDelete: 'CASCADE' }),
    JoinColumn({
        name: 'cart_id',
    }),
    __metadata("design:type", Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], CartItem.prototype, "product_id", void 0);
__decorate([
    ManyToOne(() => Product, { onDelete: 'CASCADE' }),
    JoinColumn({
        name: 'product_id',
    }),
    __metadata("design:type", Product)
], CartItem.prototype, "product", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
CartItem = __decorate([
    Entity('cart_items')
], CartItem);
export { CartItem };
