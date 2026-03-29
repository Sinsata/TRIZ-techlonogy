// Forum Module - LocalStorage ga asoslangan
class ForumManager {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem('forumPosts')) {
      localStorage.setItem('forumPosts', JSON.stringify([]));
    }
  }

  // Yangi post yaratish
  createPost(userId, username, courseId, title, content) {
    const posts = this.getPosts();
    
    if (!title.trim() || !content.trim()) {
      return { success: false, error: 'Title and content cannot be empty' };
    }

    const newPost = {
      id: this.generateId(),
      userId: userId,
      username: username,
      courseId: courseId,
      title: title,
      content: content,
      replies: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    posts.push(newPost);
    localStorage.setItem('forumPosts', JSON.stringify(posts));
    
    return { success: true, post: newPost };
  }

  // Post'ga javob berish
  replyToPost(postId, userId, username, content) {
    const posts = this.getPosts();
    const post = posts.find(p => p.id === postId);

    if (!post) {
      return { success: false, error: 'Post not found' };
    }

    if (!content.trim()) {
      return { success: false, error: 'Reply content cannot be empty' };
    }

    const reply = {
      id: this.generateId(),
      userId: userId,
      username: username,
      content: content,
      createdAt: new Date().toISOString()
    };

    post.replies.push(reply);
    post.updatedAt = new Date().toISOString();
    
    localStorage.setItem('forumPosts', JSON.stringify(posts));
    
    return { success: true, reply: reply };
  }

  // Kurs bo'yicha postlarni olish
  getPostsByCourse(courseId) {
    const posts = this.getPosts();
    return posts
      .filter(p => p.courseId === courseId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  // Barcha postlarni olish
  getPosts() {
    const posts = localStorage.getItem('forumPosts');
    return posts ? JSON.parse(posts) : [];
  }

  // Post ID bilan olish
  getPostById(postId) {
    const posts = this.getPosts();
    return posts.find(p => p.id === postId);
  }

  // Post'ni o'chirish (faqat yaratuvchi)
  deletePost(postId, userId) {
    const posts = this.getPosts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return { success: false, error: 'Post not found' };
    }

    if (posts[postIndex].userId !== userId) {
      return { success: false, error: 'You can only delete your own posts' };
    }

    posts.splice(postIndex, 1);
    localStorage.setItem('forumPosts', JSON.stringify(posts));
    
    return { success: true };
  }

  // Javobni o'chirish (faqat yaratuvchi yoki admin)
  deleteReply(postId, replyId, userId) {
    const posts = this.getPosts();
    const post = posts.find(p => p.id === postId);

    if (!post) {
      return { success: false, error: 'Post not found' };
    }

    const replyIndex = post.replies.findIndex(r => r.id === replyId);
    
    if (replyIndex === -1) {
      return { success: false, error: 'Reply not found' };
    }

    if (post.replies[replyIndex].userId !== userId) {
      return { success: false, error: 'You can only delete your own replies' };
    }

    post.replies.splice(replyIndex, 1);
    post.updatedAt = new Date().toISOString();
    
    localStorage.setItem('forumPosts', JSON.stringify(posts));
    
    return { success: true };
  }

  // Post'ni qidirish
  searchPosts(query) {
    const posts = this.getPosts();
    const lowerQuery = query.toLowerCase();
    
    return posts.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.content.toLowerCase().includes(lowerQuery) ||
      p.username.toLowerCase().includes(lowerQuery)
    );
  }

  // Forumdagi barcha javoblar sonini olish
  getTotalReplies() {
    const posts = this.getPosts();
    return posts.reduce((sum, p) => sum + p.replies.length, 0);
  }

  // Foydalanuvchining postlar sonini olish
  getUserPostsCount(userId) {
    const posts = this.getPosts();
    return posts.filter(p => p.userId === userId).length;
  }

  // ID yaratish
  generateId() {
    return 'post_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
}

// Global instance
const forum = new ForumManager();
