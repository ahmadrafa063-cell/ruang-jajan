// =====================================================
// RUANG JAJAN - DATABASE SEED DATA
// Production-ready seed script with comprehensive data
// =====================================================

import { PrismaClient, UserRole, UserStatus, ProductStatus, ProductBadge, OrderStatus, PaymentStatus, PaymentMethod, ShippingStatus, ShippingProvider, DiscountType, DiscountApplicability, ReviewStatus, EventType, ActivityLogType, NotificationType, NotificationChannel } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

async function hashPassword(password: string): Promise<string> {
     return bcrypt.hash(password, 12);
}

function randomId(): string {
     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function randomDate(start: Date, end: Date): Date {
     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// =====================================================
// SEED DATA
// =====================================================

async function main() {
     console.log('🌱 Starting database seed...\n');

     // =====================================================
     // 1. CREATE PRODUCT BADGES
     // =====================================================

     console.log('Creating product badges...');

     const badges = await Promise.all([
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.NEW },
               update: {},
               create: { badgeName: ProductBadge.NEW, displayName: 'Baru', color: '#22c55e', sortOrder: 1 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.BEST_SELLER },
               update: {},
               create: { badgeName: ProductBadge.BEST_SELLER, displayName: 'Best Seller', color: '#f59e0b', sortOrder: 2 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.SPICY },
               update: {},
               create: { badgeName: ProductBadge.SPICY, displayName: 'Pedas', color: '#ef4444', sortOrder: 3 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.VEGETARIAN },
               update: {},
               create: { badgeName: ProductBadge.VEGETARIAN, displayName: 'Vegetarian', color: '#84cc16', sortOrder: 4 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.VEGAN },
               update: {},
               create: { badgeName: ProductBadge.VEGAN, displayName: 'Vegan', color: '#10b981', sortOrder: 5 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.GLUTEN_FREE },
               update: {},
               create: { badgeName: ProductBadge.GLUTEN_FREE, displayName: 'Gluten Free', color: '#8b5cf6', sortOrder: 6 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.HALAL },
               update: {},
               create: { badgeName: ProductBadge.HALAL, displayName: 'Halal', color: '#06b6d4', sortOrder: 7 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.ORGANIC },
               update: {},
               create: { badgeName: ProductBadge.ORGANIC, displayName: 'Organik', color: '#059669', sortOrder: 8 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.LIMITED_EDITION },
               update: {},
               create: { badgeName: ProductBadge.LIMITED_EDITION, displayName: 'Limited Edition', color: '#ec4899', sortOrder: 9 }
          }),
          prisma.productBadgeRelation.upsert({
               where: { badgeName: ProductBadge.SEASONAL },
               update: {},
               create: { badgeName: ProductBadge.SEASONAL, displayName: 'Musiman', color: '#f97316', sortOrder: 10 }
          }),
     ]);

     console.log(`✅ Created ${badges.length} product badges\n`);

     // =====================================================
     // 2. CREATE CATEGORIES
     // =====================================================

     console.log('Creating categories...');

     const categories = await Promise.all([
          prisma.category.upsert({
               where: { slug: 'snacks' },
               update: {},
               create: {
                    name: 'Snacks',
                    slug: 'snacks',
                    description: 'Lezatnya camilan khas Indonesia dan internasional',
                    image: 'https://cdn.ruangjajan.com/categories/snacks.jpg',
                    sortOrder: 1,
                    isActive: true
               }
          }),
          prisma.category.upsert({
               where: { slug: 'drinks' },
               update: {},
               create: {
                    name: 'Drinks',
                    slug: 'drinks',
                    description: 'Segarkan harimu dengan minuman premium',
                    image: 'https://cdn.ruangjajan.com/categories/drinks.jpg',
                    sortOrder: 2,
                    isActive: true
               }
          }),
          prisma.category.upsert({
               where: { slug: 'main-dishes' },
               update: {},
               create: {
                    name: 'Main Dishes',
                    slug: 'main-dishes',
                    description: 'Nasi dan mie premium untuk mengisi perut',
                    image: 'https://cdn.ruangjajan.com/categories/main-dishes.jpg',
                    sortOrder: 3,
                    isActive: true
               }
          }),
          prisma.category.upsert({
               where: { slug: 'desserts' },
               update: {},
               create: {
                    name: 'Desserts',
                    slug: 'desserts',
                    description: 'Manisnya akhir yang sempurna',
                    image: 'https://cdn.ruangjajan.com/categories/desserts.jpg',
                    sortOrder: 4,
                    isActive: true
               }
          }),
          prisma.category.upsert({
               where: { slug: 'combo-packages' },
               update: {},
               create: {
                    name: 'Combo Packages',
                    slug: 'combo-packages',
                    description: 'Paket hemat untuk berbagi',
                    image: 'https://cdn.ruangjajan.com/categories/combo.jpg',
                    sortOrder: 5,
                    isActive: true
               }
          }),
     ]);

     console.log(`✅ Created ${categories.length} categories\n`);

     // =====================================================
     // 3. CREATE TAGS
     // =====================================================

     console.log('Creating tags...');

     const tags = await Promise.all([
          prisma.tag.upsert({ where: { slug: 'murah' }, update: {}, create: { name: 'Murah', slug: 'murah', color: '#22c55e' } }),
          prisma.tag.upsert({ where: { slug: 'enak' }, update: {}, create: { name: 'Enak', slug: 'enak', color: '#f59e0b' } }),
          prisma.tag.upsert({ where: { slug: 'hits' }, update: {}, create: { name: 'Hits', slug: 'hits', color: '#ec4899' } }),
          prisma.tag.upsert({ where: { slug: 'viral' }, update: {}, create: { name: 'Viral', slug: 'viral', color: '#8b5cf6' } }),
          prisma.tag.upsert({ where: { slug: 'terlaris' }, update: {}, create: { name: 'Terlaris', slug: 'terlaris', color: '#ef4444' } }),
          prisma.tag.upsert({ where: { slug: 'rekomendasi' }, update: {}, create: { name: 'Rekomendasi', slug: 'rekomendasi', color: '#06b6d4' } }),
     ]);

     console.log(`✅ Created ${tags.length} tags\n`);

     // =====================================================
     // 4. CREATE ADMIN USER
     // =====================================================

     console.log('Creating admin user...');

     const adminPassword = await hashPassword('Admin@123!');

     const admin = await prisma.user.upsert({
          where: { email: 'admin@ruangjajan.com' },
          update: {},
          create: {
               email: 'admin@ruangjajan.com',
               passwordHash: adminPassword,
               firstName: 'Admin',
               lastName: 'RuangJajan',
               phone: '+6282254707788',
               role: UserRole.ADMIN,
               status: UserStatus.ACTIVE,
               emailVerified: true,
               emailVerifiedAt: new Date(),
               marketingConsent: true
          }
     });

     console.log(`✅ Created admin user: ${admin.email}\n`);

     // =====================================================
     // 5. CREATE SAMPLE CUSTOMERS
     // =====================================================

     console.log('Creating sample customers...');

     const customerPassword = await hashPassword('Customer@123!');

     const customers = await Promise.all([
          prisma.user.upsert({
               where: { email: 'customer1@example.com' },
               update: {},
               create: {
                    email: 'customer1@example.com',
                    passwordHash: customerPassword,
                    firstName: 'Ahmad',
                    lastName: 'Rafa',
                    phone: '+6281234567890',
                    role: UserRole.CUSTOMER,
                    status: UserStatus.ACTIVE,
                    emailVerified: true,
                    marketingConsent: true
               }
          }),
          prisma.user.upsert({
               where: { email: 'customer2@example.com' },
               update: {},
               create: {
                    email: 'customer2@example.com',
                    passwordHash: customerPassword,
                    firstName: 'Sarah',
                    lastName: 'Amanda',
                    phone: '+6282345678901',
                    role: UserRole.CUSTOMER,
                    status: UserStatus.ACTIVE,
                    emailVerified: true,
                    marketingConsent: true
               }
          }),
          prisma.user.upsert({
               where: { email: 'customer3@example.com' },
               update: {},
               create: {
                    email: 'customer3@example.com',
                    passwordHash: customerPassword,
                    firstName: 'Budi',
                    lastName: 'Santoso',
                    phone: '+6283456789012',
                    role: UserRole.CUSTOMER,
                    status: UserStatus.ACTIVE,
                    emailVerified: true,
                    marketingConsent: false
               }
          }),
     ]);

     console.log(`✅ Created ${customers.length} sample customers\n`);

     // =====================================================
     // 6. CREATE PRODUCTS
     // =====================================================

     console.log('Creating products...');

     const snackCategory = categories.find(c => c.slug === 'snacks')!;
     const drinkCategory = categories.find(c => c.slug === 'drinks')!;
     const mainDishCategory = categories.find(c => c.slug === 'main-dishes')!;
     const dessertCategory = categories.find(c => c.slug === 'desserts')!;

     const products = await Promise.all([
          // Snacks
          prisma.product.upsert({
               where: { slug: 'premium-burger' },
               update: {},
               create: {
                    name: 'Premium Burger',
                    slug: 'premium-burger',
                    description: 'Burger premium dengan daging sapi import, sayuran segar, dan saus spesial. Rasa yang tak terlupakan.',
                    shortDescription: 'Burger premium dengan daging sapi import',
                    price: new Decimal(45000),
                    costPrice: new Decimal(25000),
                    compareAtPrice: new Decimal(55000),
                    sku: 'SNK-BURGER-001',
                    stockQuantity: 100,
                    lowStockThreshold: 20,
                    status: ProductStatus.PUBLISHED,
                    isFeatured: true,
                    categoryId: snackCategory.id,
                    weight: new Decimal(350),
                    averageRating: new Decimal(4.5),
                    reviewCount: 128,
                    viewCount: 1520,
                    soldCount: 856
               }
          }),
          prisma.product.upsert({
               where: { slug: 'kopi-genggaman' },
               update: {},
               create: {
                    name: 'Kopi Genggaman',
                    slug: 'kopi-genggaman',
                    description: 'Signature premium coffee blend dengan rasa kaya dan halus. Cocok untuk memulai hari.',
                    shortDescription: 'Signature premium coffee blend',
                    price: new Decimal(25000),
                    costPrice: new Decimal(12000),
                    sku: 'DRK-KOPI-001',
                    stockQuantity: 200,
                    status: ProductStatus.PUBLISHED,
                    isFeatured: true,
                    categoryId: drinkCategory.id,
                    weight: new Decimal(400),
                    averageRating: new Decimal(4.8),
                    reviewCount: 256,
                    viewCount: 3200,
                    soldCount: 2100
               }
          }),
          prisma.product.upsert({
               where: { slug: 'matcha-iced-coffee' },
               update: {},
               create: {
                    name: 'Iced Coffee Matcha',
                    slug: 'matcha-iced-coffee',
                    description: 'Perpaduan sempurna antara kopi dan matcha. Segar dan menyegarkan.',
                    shortDescription: 'Perpaduan kopi dan matcha yang menyegarkan',
                    price: new Decimal(28000),
                    costPrice: new Decimal(14000),
                    sku: 'DRK-MATCHA-001',
                    stockQuantity: 150,
                    status: ProductStatus.PUBLISHED,
                    isFeatured: true,
                    categoryId: drinkCategory.id,
                    weight: new Decimal(450),
                    averageRating: new Decimal(4.6),
                    reviewCount: 189,
                    viewCount: 2450,
                    soldCount: 1560
               }
          }),
          prisma.product.upsert({
               where: { slug: 'nasi-goreng-special' },
               update: {},
               create: {
                    name: 'Nasi Goreng Special',
                    slug: 'nasi-goreng-special',
                    description: 'Nasi goreng dengan resep turun temurun. Bumbu khas yang menggugah selera.',
                    shortDescription: 'Nasi goreng resep turun temurun',
                    price: new Decimal(35000),
                    costPrice: new Decimal(18000),
                    sku: 'MND-NASI-001',
                    stockQuantity: 80,
                    status: ProductStatus.PUBLISHED,
                    isFeatured: true,
                    categoryId: mainDishCategory.id,
                    weight: new Decimal(500),
                    averageRating: new Decimal(4.7),
                    reviewCount: 312,
                    viewCount: 4100,
                    soldCount: 2890
               }
          }),
          prisma.product.upsert({
               where: { slug: 'chocolate-cake' },
               update: {},
               create: {
                    name: 'Chocolate Lava Cake',
                    slug: 'chocolate-cake',
                    description: 'Kue cokelat dengan lelehan cokelat di dalamnya. Manisnya sempurna.',
                    shortDescription: 'Kue cokelat dengan lelehan cokelat',
                    price: new Decimal(32000),
                    costPrice: new Decimal(15000),
                    sku: 'DSR-CAKE-001',
                    stockQuantity: 50,
                    status: ProductStatus.PUBLISHED,
                    isFeatured: true,
                    categoryId: dessertCategory.id,
                    weight: new Decimal(200),
                    averageRating: new Decimal(4.9),
                    reviewCount: 445,
                    viewCount: 5600,
                    soldCount: 3200
               }
          }),
     ]);

     console.log(`✅ Created ${products.length} products\n`);

     // =====================================================
     // 7. ADD PRODUCT BADGES
     // =====================================================

     console.log('Adding product badges...');

     const bestSellerBadge = badges.find(b => b.badgeName === ProductBadge.BEST_SELLER)!;
     const newBadge = badges.find(b => b.badgeName === ProductBadge.NEW)!;
     const spicyBadge = badges.find(b => b.badgeName === ProductBadge.SPICY)!;

     await prisma.productBadgeOnProducts.createMany({
          data: [
               { productId: products[0].id, badgeName: ProductBadge.BEST_SELLER },
               { productId: products[1].id, badgeName: ProductBadge.BEST_SELLER },
               { productId: products[2].id, badgeName: ProductBadge.NEW },
               { productId: products[3].id, badgeName: ProductBadge.SPICY },
          ],
          skipDuplicates: true
     });

     console.log('✅ Added product badges\n');

     // =====================================================
     // 8. ADD PRODUCT IMAGES
     // =====================================================

     console.log('Adding product images...');

     const productImages = [
          { productId: products[0].id, url: 'https://cdn.ruangjajan.com/products/premium_burger.jpg', isPrimary: true, sortOrder: 1 },
          { productId: products[0].id, url: 'https://cdn.ruangjajan.com/products/premium_burger_2.jpg', isPrimary: false, sortOrder: 2 },
          { productId: products[1].id, url: 'https://cdn.ruangjajan.com/products/kopi_genggaman.jpg', isPrimary: true, sortOrder: 1 },
          { productId: products[2].id, url: 'https://cdn.ruangjajan.com/products/iced_coffee_matcha.jpg', isPrimary: true, sortOrder: 1 },
          { productId: products[3].id, url: 'https://cdn.ruangjajan.com/products/nasi_goreng.jpg', isPrimary: true, sortOrder: 1 },
          { productId: products[4].id, url: 'https://cdn.ruangjajan.com/products/chocolate_cake.jpg', isPrimary: true, sortOrder: 1 },
     ];

     for (const image of productImages) {
          await prisma.productImage.create({ data: image });
     }

     console.log(`✅ Added ${productImages.length} product images\n`);

     // =====================================================
     // 9. CREATE DISCOUNTS
     // =====================================================

     console.log('Creating discounts...');

     const discount = await prisma.discount.upsert({
          where: { code: 'RUANGJAJAN50' },
          update: {},
          create: {
               code: 'RUANGJAJAN50',
               name: 'Diskon 50% Spesial',
               description: 'Diskon 50% untuk pembelian pertama',
               type: DiscountType.PERCENTAGE,
               applicability: DiscountApplicability.FIRST_ORDER,
               value: new Decimal(50),
               maxDiscountAmount: new Decimal(50000),
               minOrderAmount: new Decimal(100000),
               startsAt: new Date(),
               expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
               isActive: true,
               isPublic: true
          }
     });

     console.log('✅ Created discount: RUANGJAJAN50\n');

     // =====================================================
     // 10. CREATE ADDRESSES
     // =====================================================

     console.log('Creating addresses...');

     const customer = customers[0];

     const address = await prisma.address.create({
          data: {
               userId: customer.id,
               type: 'home',
               label: 'Rumah',
               recipientName: 'Ahmad Rafa',
               recipientPhone: '+6281234567890',
               streetAddress: 'Jl. Sudirman No. 123',
               addressLine2: 'RT 05/RW 03',
               village: 'Samarinda Kota',
               district: 'Samarinda',
               city: 'Samarinda',
               province: 'Kalimantan Timur',
               postalCode: '75121',
               country: 'Indonesia',
               latitude: -0.4958,
               longitude: 117.1494,
               isDefault: true,
               isActive: true
          }
     });

     console.log('✅ Created address\n');

     // =====================================================
     // 11. CREATE REVIEWS
     // =====================================================

     console.log('Creating reviews...');

     await prisma.review.upsert({
          where: { userId_productId: { userId: customer.id, productId: products[0].id } },
          update: {},
          create: {
               userId: customer.id,
               productId: products[0].id,
               rating: 5,
               title: 'Sangat lezat!',
               content: 'Burger terbaik yang pernah saya coba. Dagingnya juicy dan bumbunya sempurna.',
               status: ReviewStatus.APPROVED,
               moderatedAt: new Date(),
               helpfulCount: 12,
               unhelpfulCount: 1
          }
     });

     console.log('✅ Created review\n');

     // =====================================================
     // 12. CREATE ANALYTICS EVENTS
     // =====================================================

     console.log('Creating analytics events...');

     const analyticsEvents = [];
     const eventTypes = [EventType.PAGE_VIEW, EventType.PRODUCT_VIEW, EventType.ADD_TO_CART, EventType.SEARCH];

     for (let i = 0; i < 100; i++) {
          analyticsEvents.push({
               type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
               sessionId: randomId(),
               userId: Math.random() > 0.5 ? customer.id : null,
               pageUrl: '/products/premium-burger',
               productId: products[0].id,
               searchQuery: Math.random() > 0.7 ? 'burger' : null,
               userAgent: 'Mozilla/5.0',
               deviceType: 'mobile',
               browser: 'Chrome',
               os: 'Android',
               country: 'Indonesia',
               city: 'Samarinda'
          });
     }

     await prisma.analyticsEvent.createMany({
          data: analyticsEvents
     });

     console.log(`✅ Created ${analyticsEvents.length} analytics events\n`);

     // =====================================================
     // 13. CREATE PRODUCT ANALYTICS
     // =====================================================

     console.log('Creating product analytics...');

     for (const product of products) {
          await prisma.productAnalytics.upsert({
               where: { productId_date: { productId: product.id, date: new Date() } },
               update: {},
               create: {
                    productId: product.id,
                    date: new Date(),
                    viewCount: Math.floor(Math.random() * 100) + 50,
                    uniqueViewCount: Math.floor(Math.random() * 80) + 30,
                    cartAddCount: Math.floor(Math.random() * 20) + 5,
                    purchaseCount: Math.floor(Math.random() * 10) + 2,
                    revenue: new Decimal(Math.floor(Math.random() * 500000) + 100000)
               }
          });
     }

     console.log(`✅ Created product analytics for ${products.length} products\n`);

     // =====================================================
     // 14. CREATE PRODUCT RECOMMENDATIONS
     // =====================================================

     console.log('Creating product recommendations...');

     await prisma.productRecommendation.createMany({
          data: [
               {
                    productId: products[0].id,
                    recommendedProductId: products[1].id,
                    type: 'frequently_bought_together',
                    score: new Decimal(0.85)
               },
               {
                    productId: products[0].id,
                    recommendedProductId: products[2].id,
                    type: 'similar_products',
                    score: new Decimal(0.72)
               },
               {
                    productId: products[1].id,
                    recommendedProductId: products[2].id,
                    type: 'frequently_bought_together',
                    score: new Decimal(0.91)
               },
               {
                    productId: products[3].id,
                    recommendedProductId: products[4].id,
                    type: 'trending',
                    score: new Decimal(0.78)
               }
          ],
          skipDuplicates: true
     });

     console.log('✅ Created product recommendations\n');

     // =====================================================
     // 15. CREATE NOTIFICATIONS
     // =====================================================

     console.log('Creating notifications...');

     await prisma.notification.create({
          data: {
               userId: customer.id,
               type: NotificationType.ORDER_UPDATE,
               channel: NotificationChannel.IN_APP,
               title: 'Pesanan Dikonfirmasi',
               message: 'Pesanan Anda dengan nomor #RJ-001234 telah dikonfirmasi.',
               actionUrl: '/orders/RJ-001234',
               isRead: false
          }
     });

     console.log('✅ Created notification\n');

     // =====================================================
     // 16. CREATE ACTIVITY LOG
     // =====================================================

     console.log('Creating activity log...');

     await prisma.activityLog.create({
          data: {
               userId: admin.id,
               type: ActivityLogType.ADMIN_ACTION,
               action: 'CREATE_PRODUCT',
               description: 'Created new product: Premium Burger',
               entityType: 'Product',
               entityId: products[0].id,
               ipAddress: '192.168.1.1',
               userAgent: 'Mozilla/5.0',
               newData: { name: 'Premium Burger', price: 45000 }
          }
     });

     console.log('✅ Created activity log\n');

     // =====================================================
     // 17. CREATE SAMPLE CART
     // =====================================================

     console.log('Creating sample cart...');

     const cart = await prisma.cart.upsert({
          where: { userId: customer.id },
          update: {},
          create: {
               userId: customer.id,
               isActive: true
          }
     });

     await prisma.cartItem.upsert({
          where: { cartId_productId: { cartId: cart.id, productId: products[0].id } },
          update: {},
          create: {
               cartId: cart.id,
               productId: products[0].id,
               variantId: null,
               quantity: 2
          }
     });

     await prisma.cartItem.upsert({
          where: { cartId_productId: { cartId: cart.id, productId: products[1].id } },
          update: {},
          create: {
               cartId: cart.id,
               productId: products[1].id,
               variantId: null,
               quantity: 1
          }
     });

     console.log('✅ Created sample cart\n');

     // =====================================================
     // 18. CREATE SAMPLE WISHLIST
     // =====================================================

     console.log('Creating sample wishlist...');

     const wishlist = await prisma.wishlist.upsert({
          where: { userId: customer.id },
          update: {},
          create: {
               userId: customer.id,
               isActive: true
          }
     });

     await prisma.wishlistItem.upsert({
          where: { wishlistId_productId: { wishlistId: wishlist.id, productId: products[4].id } },
          update: {},
          create: {
               wishlistId: wishlist.id,
               productId: products[4].id
          }
     });

     console.log('✅ Created sample wishlist\n');

     // =====================================================
     // 19. CREATE SAMPLE ORDER
     // =====================================================

     console.log('Creating sample order...');

     const order = await prisma.order.upsert({
          where: { orderNumber: 'RJ-' + Date.now().toString().slice(-8) },
          update: {},
          create: {
               orderNumber: 'RJ-' + Date.now().toString().slice(-8),
               status: OrderStatus.CONFIRMED,
               userId: customer.id,
               subtotal: new Decimal(122000),
               discountAmount: new Decimal(0),
               shippingCost: new Decimal(15000),
               taxAmount: new Decimal(0),
               total: new Decimal(137000),
               shippingAddressId: address.id,
               billingAddressId: address.id,
               orderedAt: new Date(),
               confirmedAt: new Date(),
               customerNotes: 'Tolong pedasnya sedang saja'
          }
     });

     await prisma.orderItem.upsert({
          where: { orderId_productId: { orderId: order.id, productId: products[0].id } },
          update: {},
          create: {
               orderId: order.id,
               productId: products[0].id,
               variantId: null,
               productName: products[0].name,
               productSku: products[0].sku,
               unitPrice: products[0].price,
               quantity: 2,
               totalPrice: new Decimal(90000),
               status: OrderStatus.CONFIRMED
          }
     });

     await prisma.orderItem.upsert({
          where: { orderId_productId: { orderId: order.id, productId: products[1].id } },
          update: {},
          create: {
               orderId: order.id,
               productId: products[1].id,
               variantId: null,
               productName: products[1].name,
               productSku: products[1].sku,
               unitPrice: products[1].price,
               quantity: 1,
               totalPrice: new Decimal(25000),
               status: OrderStatus.CONFIRMED
          }
     });

     // Create payment
     await prisma.payment.upsert({
          where: { orderId: order.id },
          update: {},
          create: {
               orderId: order.id,
               method: PaymentMethod.COD,
               status: PaymentStatus.PENDING,
               amount: new Decimal(137000)
          }
     });

     // Create shipment
     await prisma.shipment.upsert({
          where: { orderId: order.id },
          update: {},
          create: {
               orderId: order.id,
               provider: ShippingProvider.JNE,
               status: ShippingStatus.PENDING,
               shippingCost: new Decimal(15000)
          }
     });

     console.log('✅ Created sample order\n');

     // =====================================================
     // 20. CREATE SESSIONS
     // =====================================================

     console.log('Creating sessions...');

     const sessionToken = randomId() + randomId();

     await prisma.session.upsert({
          where: { token: sessionToken },
          update: {},
          create: {
               userId: customer.id,
               token: sessionToken,
               expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
               ipAddress: '192.168.1.100',
               userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
     });

     console.log('✅ Created session\n');

     // =====================================================
     // 21. CREATE SEARCH INDEXES
     // =====================================================

     console.log('Creating search indexes...');

     for (const product of products) {
          await prisma.searchIndex.upsert({
               where: { entityType_entityId: { entityType: 'product', entityId: product.id } },
               update: {},
               create: {
                    entityType: 'product',
                    entityId: product.id,
                    title: product.name,
                    content: product.description
               }
          });
     }

     console.log(`✅ Created ${products.length} search indexes\n`);

     console.log('🎉 Database seed completed successfully!\n');
}

// =====================================================
// EXECUTE SEED
// =====================================================

main()
     .catch((e) => {
          console.error('❌ Seed failed:', e);
          process.exit(1);
     })
     .finally(async () => {
          await prisma.$disconnect();
     });