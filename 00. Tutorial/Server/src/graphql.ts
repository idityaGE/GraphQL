import { TODOS } from './data/todos';
import { USERS } from './data/users';
import type { User, Todo } from './types.ts';

export const typeDefs = `
    # comment 
    # '!' means required

    type User {
      id: Int!
      name: String!
      email: String!
      todos: [Todo!]!
    }

    type Todo {
      id: Int!
      title: String!
      completed: Boolean!
      userId: Int!
      user: User!
    }

    type Query {
      todos: [Todo!]!
      users: [User!]!
      getTodoById(id: Int!): Todo
      getUserById(id: Int!): User
    }

    type Mutation {
      addTodo(
        title: String!
        completed: Boolean!
        userId: Int!
      ): Todo!

      updateTodo(
        id: Int!
        title: String
        completed: Boolean
        userId: Int
      ): Todo!
    }
`
export const resolvers = {
  Query: {
    todos: () => TODOS, // do database query here
    users: () => USERS,
    getTodoById: (parent: never, { id }: { id: number }) => TODOS.find(todo => todo.id === id),
    getUserById: (parent: never, { id }: { id: number }) => USERS.find(user => user.id === id),
  },

  Todo: {
    user: (parent: Todo) => USERS.find(user => user.id === parent.userId),
  },

  User: {
    todos: (parent: User) => TODOS.filter(todo => todo.userId === parent.id),
  },


  Mutation: {
    addTodo: (_: never, { title, completed, userId }: {
      title: string,
      completed: boolean,
      userId: number
    }) => {
      const newTodo = {
        id: TODOS.length + 1,
        title,
        completed,
        userId,
      };
      TODOS.push(newTodo);
      return newTodo;
    },

    updateTodo: (_: never, { id, title, completed, userId }: {
      id: number,
      title?: string,
      completed?: boolean,
      userId?: number
    }) => {
      const todo = TODOS.find(todo => todo.id === id);
      if (!todo) {
        throw new Error('Todo not found');
      }

      if (title !== undefined) {
        todo.title = title;
      }
      if (completed !== undefined) {
        todo.completed = completed;
      }
      if (userId !== undefined) {
        todo.userId = userId;
      }

      return todo;
    }
  },
}
