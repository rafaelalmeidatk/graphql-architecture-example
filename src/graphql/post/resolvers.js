import posts from './data';

export default {
  Query: {
    allPosts: () => {
      return posts;
    }
  },

  Mutation: {
    createPost: (root, {title, content}, context) => {
      const newPost = {
        id: posts.length,
        title,
        content,
      };
      posts.push(newPost)
      return newPost;
    }
  },
};