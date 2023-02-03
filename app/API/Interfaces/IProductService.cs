using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Interfaces
{
    public interface IProductService
    {
        void AddProductAsync(Product product);

        void RemoveProduct(Product product);

        void EditProductAsync(Product product);

        Task<Product> GetSingleProductAsync(int id);

        Task<List<Product>> GetAllProductsAsync();

        Task<List<Product>> GetProductsByCategoryAsync(string category);

        Task<List<Product>> GetProductsByTypeAsync(string type);

        Task<bool> SaveAllAsync();
    }
}