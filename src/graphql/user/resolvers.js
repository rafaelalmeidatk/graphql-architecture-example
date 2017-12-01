import users from './data';
import posts from '../post/data';
import pubsub from '../pubsub';

export default {
  Query: {
    allUsers: () => {
      return users.map(user => {
        const usr = Object.assign({}, user);
        usr.posts = posts.filter(post => JSON.stringify(post.author) === JSON.stringify(usr));
        return usr;
      });
    },
  },

  Mutation: {
    createUser: (root, {name, email}) => {
      const newUser = {
        id: users.length,
        name,
        email,
      };
      users.push(newUser);
      pubsub.publish('User', {User: {node: newUser}});
      return newUser;
    },
  },

  Subscription: {
    User: {
      subscribe: () => pubsub.asyncIterator('User'),
    },
  },
};