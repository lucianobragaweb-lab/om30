import { Server, Model } from 'miragejs'

export function makeServer (enviroment = 'development') {
  return new Server({
    enviroment,

    models: {
      user: Model,
    },

    seeds (Server) {
      Server.create("user", {
        name: 'Dr. José das Couves',
        email: "user@example.com",
        password: "password123",
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      })
    },

    routes () {
      this.namespace = 'api'

      this.get('patients', () => {
        return [
          {
            photo:
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            name: 'Maria da silva melo',
            mother: 'Joana da silva melo',
            birth: new Date('2020-10-25'),
            cpf: '052.188.328-25',
            cns: '052.188.328-25',
            address: 'Rua das pedras, 25, pereiros, Meruoca-CE, 125-458-000'
          }
        ]
      })

      this.post("/login", (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody)

        let user = schema.users.findBy({ email })

        if (!user || user.password !== password) {
          return new Response(401, {}, { message: "Incorrect email or password" })
        }

        let token = "my-jwt-token"

        localStorage.setItem("token", token)
        localStorage.setItem("user", user)

        return { token, user }
      })
    }
  })
}
