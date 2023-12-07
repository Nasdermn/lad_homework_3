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
import { Order } from './order.entity.js';
import { Product } from './product.entity.js';
let OrderDetails = class OrderDetails extends BaseEntity {
    details_id;
    order_id;
    order;
    product_id;
    product;
    quantity;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "details_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "order_id", void 0);
__decorate([
    ManyToOne(() => Order, { onDelete: 'CASCADE' }),
    JoinColumn({
        name: 'order_id',
    }),
    __metadata("design:type", Order)
], OrderDetails.prototype, "order", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "product_id", void 0);
__decorate([
    ManyToOne(() => Product, { onDelete: 'CASCADE' }),
    JoinColumn({
        name: 'product_id',
    }),
    __metadata("design:type", Product)
], OrderDetails.prototype, "product", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "quantity", void 0);
OrderDetails = __decorate([
    Entity('order_details')
], OrderDetails);
export { OrderDetails };
