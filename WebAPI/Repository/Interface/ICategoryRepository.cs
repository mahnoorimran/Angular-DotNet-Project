using WebAPI.Models.Domain;

namespace WebAPI.Repository.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);
        Task<IEnumerable<Category>> GetAllCategories();
        Task<Category> FindByIdAsync(Guid id);
        Task<Category> UpdateAsync(Category category);
        Task<Category> DeleteCategory(Guid id);
    }
}
