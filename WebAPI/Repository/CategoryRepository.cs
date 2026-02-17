using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models.Domain;
using WebAPI.Repository.Interface;

namespace WebAPI.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
            
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> DeleteCategory(Guid id)
        {
            var existingCategory = await _context.Categories.FirstOrDefaultAsync(
                m=>m.Id==id);
            if(existingCategory==null)
            {
                return null;


            }
             _context.Categories.Remove(existingCategory);
            await _context.SaveChangesAsync();
            return existingCategory;


        }

        public async Task<Category> FindByIdAsync(Guid id)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _context.Categories.ToListAsync();

        }

        public async Task<Category> UpdateAsync(Category category)
        {
            var existCategory = await _context.Categories.FirstOrDefaultAsync(
                c => c.Id == category.Id);
            if (existCategory != null)
            {
                existCategory.Name = category.Name;
                existCategory.UrlHandle= category.UrlHandle;
            }
            await _context.SaveChangesAsync();
            return existCategory;



        }
    }
}
