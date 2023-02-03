using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Services
{
  public class ProductService : IProductService
  {
    private readonly DataContext.DataContext _context;
    private readonly IMapper _mapper;
    public ProductService(DataContext.DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
        
    }

    public async void AddProductAsync(Product product)
    {
      await _context.Products.AddAsync(product);
    }

    public void EditProductAsync(Product product)
    {
      throw new NotImplementedException();
    }

    public async Task<List<Product>> GetAllProductsAsync()
    {
      return await _context.Products.ToListAsync();
    }

    public async Task<List<Product>> GetProductsByCategoryAsync(string category)
    {
      return await _context.Products.Where(product => product.Category == category).ToListAsync();
    }

    public async Task<List<Product>> GetProductsByTypeAsync(string type)
    {
      return await _context.Products.Where(product => product.Type == type).ToListAsync();
    }

    public async Task<Product> GetSingleProductAsync(int id)
    {
      return await _context.Products.FindAsync(id);
    }

    public void RemoveProduct(Product product)
    {
      _context.Products.Remove(product);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
  }
}