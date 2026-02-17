using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models.Domain;
using WebAPI.Repository.Interface;

namespace WebAPI.Repository
{
    public class BlogPostRepository : IBlogPostRepository
    {

        private readonly ApplicationDbContext _context;
        public BlogPostRepository(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task<BlogPost> CreateBlogAsync(BlogPost blogPost)
        {
            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();
            return blogPost;
        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPosts()
        {
            var blogPosts = await _context.BlogPosts.ToListAsync();
            if (blogPosts == null)
            {
                throw new Exception("No blog posts found");
            }
            return blogPosts;
        }
    }
}
