// jest.mock("../models/product", () => {
//   const actualProduct = jest.requireActual("../models/product");
//   return {
//     __esModule: true,
//     default: jest.fn().mockImplementation(() => ({
//       save: jest.fn().mockResolvedValue(mockProduct),
//     })),
//     findOne: jest.fn(),
//     findOneAndUpdate: jest.fn(),
//     findById: jest.fn(),
//     findByIdAndDelete: jest.fn(),
//     find: jest.fn(),
//     create: jest.fn().mockImplementation((data) => new actualProduct(data)),
//   };
// });
// const productRepository = require('../repository/product.repository');
// const Product = require('../models/product');

// describe("Product Repository Operations", () => {
//   const mockProduct = {
//     name: "Car Cleaning Cloth",
//     price: 300,
//     description: "Microfiber Cloth for cleaning and Dusting",
//     image: ["https://res.cloudinary.com/dkzx8v24n/image/upload/v1713772474/ProductImages/urx7mnn30nwfkaaghyz9.jpg"],
//     sku: "PRO03",
//     quantity: 25,
//     isFavorite: false
//   };

//   beforeEach(() => {
//     Product.findOne.mockClear();
//     Product.findOneAndUpdate.mockClear();
//     Product.findById.mockClear();
//     Product.findByIdAndDelete.mockClear();
//     Product.find.mockClear();
//     Product.create.mockClear();
//   });

//   it("should create a new product", async () => {
//     const productInstance = new Product();
//     productInstance.save.mockResolvedValue(mockProduct);

//     const result = await productRepository.createProduct(mockProduct);
//     expect(Product).toHaveBeenCalled();
//     expect(productInstance.save).toHaveBeenCalled();
//     expect(result).toEqual(mockProduct);
//   });

//   it("should find a product by SKU", async () => {
//     Product.findOne.mockResolvedValue(mockProduct);
//     const result = await productRepository.getOneProject({ sku: 'PRO03' });
//     expect(Product.findOne).toHaveBeenCalledWith({ sku: 'PRO03' });
//     expect(result).toEqual(mockProduct);
//   });

//   it("should update a product", async () => {
//     Product.findOneAndUpdate.mockResolvedValue({ ...mockProduct, quantity: 30 });
//     const result = await productRepository.updateProduct({ ...mockProduct, quantity: 30, _id: '662614ead15e118f2bbf2afe' });
//     expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
//       { _id: '662614ead15e118f2bbf2afe' },
//       { ...mockProduct, quantity: 30 },
//       { new: true }
//     );
//     expect(result.quantity).toEqual(30);
//   });

//   it("should delete a product by ID", async () => {
//     Product.findByIdAndDelete.mockResolvedValue(mockProduct);
//     const result = await productRepository.deleteProduct({ id: '662614ead15e118f2bbf2afe' });
//     expect(Product.findByIdAndDelete).toHaveBeenCalledWith('662614ead15e118f2bbf2afe');
//     expect(result).toEqual(mockProduct);
//   });

//   it("should retrieve all products", async () => {
//     Product.find.mockResolvedValue([mockProduct]);
//     const result = await productRepository.getAllProducts();
//     expect(Product.find).toHaveBeenCalled();
//     expect(result).toEqual([mockProduct]);
//   });

//   it("should retrieve favorite products", async () => {
//     const favoriteProduct = { ...mockProduct, isFavorite: true };
//     Product.find.mockResolvedValue([favoriteProduct]);
//     const result = await productRepository.getFavoriteProducts();
//     expect(Product.find).toHaveBeenCalledWith({ isFavorite: true });
//     expect(result).toEqual([favoriteProduct]);
//   });
// });
