using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Authorize]
    public class ProductController : BaseAPIController
    {
        private readonly IProductService _productService;
    private readonly IMapper _mapper;
        public ProductController(IProductService productService, IMapper mapper)
        {
            _mapper = mapper;
            _productService = productService;
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddProduct(ProductDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            _productService.AddProductAsync(product);

            if(await _productService.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDTO>>> GetProducts()
        {
            return Ok(await _productService.GetAllProductsAsync());
        }

        [HttpGet("{category}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductsByCategory(string category)
        {
            return Ok(await _productService.GetProductsByCategoryAsync(category));
        }

        [HttpGet("{type}")]
        public async Task<ActionResult<List<ProductDTO>>> GetProductsByType(string type)
        {
            return Ok(await _productService.GetProductsByCategoryAsync(type));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<ProductDTO>>> GetSingleProduct(int id)
        {
            return Ok(await _productService.GetSingleProductAsync(id));
        }

        // Already Products exists
    }
}