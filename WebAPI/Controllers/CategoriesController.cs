using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models.Domain;
using WebAPI.Models.DTO;
using WebAPI.Repository;
using WebAPI.Repository.Interface;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this._categoryRepository = categoryRepository;

        }
        [HttpPost]

        public async Task<IActionResult> CreateCategory(CreateCategoryDto create)
        {
            //map dto to domainmodel
            var category = new Category
            {
                Name = create.Name,
                UrlHandle = create.UrlHandle
            };
            await _categoryRepository.CreateAsync(category);

            //map  domainModel  to Dto
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(response);
        }

        //GetAllCategories: api/categories
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllCategories();
            //map domain model to dto
            var response = categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                UrlHandle = c.UrlHandle
            });
            return Ok(response);
        }

        //Get:CategoryById  api/categories/{id}
        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById(Guid id)
        {
            var category = await _categoryRepository.FindByIdAsync(id);
            if (category == null)
            {
                return NotFound("Category not found");
            }
            return Ok(category);
        }
        //Update: api/categories/{id}
        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> UpdateCategory(Guid id, UpdateCategoryDto update)
        {
            //Dto to domainModel 
            var category = new Category
            {
                Id = id,
                Name = update.Name,
                UrlHandle = update.UrlHandle
            };
            return Ok(await _categoryRepository.UpdateAsync(category));


        }
        //Delete: api/categories/{id}
        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var existingCat= await _categoryRepository.DeleteCategory(id);
            if(existingCat==null)
            {
                return NotFound("Category not found");
            }
            var response = new Category
            {
                Id = existingCat.Id,
                Name = existingCat.Name,
                UrlHandle = existingCat.UrlHandle
            };
            return Ok(response);


        }

    }
}
