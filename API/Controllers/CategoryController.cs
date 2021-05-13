using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoryController : BaseApiController
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpPost("category")]
        public async Task<ActionResult<Category>> AddCategory(Category category)
        {
            if (await CategoryExists(category.CategoryName)) return BadRequest(category.CategoryName + " already exists");

            await _categoryRepository.Save(category);
            
            return category;
        }

        [HttpPut("category")]
        public async Task<ActionResult> UpdateCategory(Category category)
        {
            _categoryRepository.Update(category);
            if(await _categoryRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed To Update Category");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> RemoveCategory(int id)
        {
            Category category = await _categoryRepository.GetCategoryById(id);

            if(category != null) {
                _categoryRepository.Remove(category);
                if(await _categoryRepository.SaveAllAsync()) return NoContent();
            }

            return BadRequest("Category doesn't exist");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
        {
            return Ok(await _categoryRepository.GetAllCategories());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> getCategoryById(int id)
        {
            return await _categoryRepository.GetCategoryById(id);
        }

        [HttpGet("categoryname/{categoryName}")]
        public async Task<ActionResult<Category>> GetCategoryByName(string categoryName)
        {
            return await _categoryRepository.GetCategoryByName(categoryName);
        }
        public async Task<bool> CategoryExists(string categoryName)
        {
            return await _categoryRepository.CategoryExistsByName(categoryName);
        }
    }
}