using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models.Domain;
using WebAPI.Models.DTO;
using WebAPI.Repository.Interface;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository _blogPostRepository;
        public BlogPostsController(IBlogPostRepository blogPostRepository)
        {
            _blogPostRepository = blogPostRepository;
            
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            var listOfBlogs = await _blogPostRepository.GetAllBlogPosts();
            if (listOfBlogs == null || !listOfBlogs.Any())
            {
                return NotFound("No blog posts found.");
            }
            return Ok(listOfBlogs);

        }


            [HttpPost]
        public async Task<IActionResult> CreateBlogPost(CreateBlogPostDto blogPost)
        {
            //map dto to domain model
            var blog = new BlogPost
            {
                Title = blogPost.Title,
                Content = blogPost.Content,
                Author = blogPost.Author,
                FeaturedImgUrl = blogPost.FeaturedImgUrl,
                UrlHandle = blogPost.UrlHandle,
                ShortDescription = blogPost.ShortDescription,
                PublishedDate = blogPost.PublishedDate,
                IsVisible = blogPost.IsVisible,

            };
            await _blogPostRepository.CreateBlogAsync(blog);
            //map domain model to dto
            var response = new BlogPostDto
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Author = blog.Author,
                FeaturedImgUrl = blog.FeaturedImgUrl,
                UrlHandle = blog.UrlHandle,
                ShortDescription = blog.ShortDescription,
                PublishedDate = blog.PublishedDate,
                IsVisible = blog.IsVisible
            };
            if (response != null)
            {
                return Ok(response);
            }
            return BadRequest("Blog post creation failed.");

        }
    }
}
