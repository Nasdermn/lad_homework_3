var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
let Product = class Product extends BaseEntity {
    product_id;
    title;
    type;
    price;
    description;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "product_id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    Column({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
Product = __decorate([
    Entity('products')
], Product);
export { Product };
