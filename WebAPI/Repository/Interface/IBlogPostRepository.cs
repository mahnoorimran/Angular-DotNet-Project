using WebAPI.Models.Domain;

namespace WebAPI.Repository.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> CreateBlogAsync(BlogPost blogPost);
        Task<IEnumerable<BlogPost>> GetAllBlogPosts();
    }
}
