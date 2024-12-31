import { gql, useQuery } from '@apollo/client'

const GET_TODOS_QUERY = gql`
query GetAllTodos {
  todos {
    id
    title
    completed
    user {
      name
    }
  }
}
`

/** Response 
 * "data": {
    "todos": [
      {
        "id": 1,
        "title": "delectus aut autem",
        "completed": true,
        "user": {
          "name": "Leanne Graham"
        }
      },
      {
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false,
        "user": {
          "name": "Leanne Graham"
        }
      },
 */

function App() {
  const { loading, error, data } = useQuery(GET_TODOS_QUERY)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Completed</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {data.todos.map((todo: any) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
                <td>{todo.user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
