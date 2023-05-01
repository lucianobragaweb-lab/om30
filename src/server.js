import { Server, Model } from 'miragejs'

export function makeServer (enviroment = 'development') {
  return new Server({
    enviroment,

    models: {
      user: Model,
      patient: Model
    },

    seeds (Server) {
      Server.create("user", {
        id: 1,
        name: 'Dr. José das Couves',
        email: "user@example.com",
        password: "password123",
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }),
        Server.create("patient", {
          id: 1,
          photo:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          name: 'Maria da silva melo',
          mother: 'Joana da silva melo',
          birth: new Date('2020-10-25'),
          cpf: '052.188.328-25',
          cns: '052.188.328-25',
          address: 'Rua das pedras, 25, pereiros, Meruoca-CE, 125-458-000'
        })

      Server.create("patient", {
        id: 2,
        photo:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        name: 'Maria da silva braga',
        mother: 'Joana da silva braga',
        birth: new Date('2020-10-25'),
        cpf: '052.188.324-25',
        cns: '052.188.338-25',
        address: 'Rua das pedras, 25, pereiros, Meruoca-CE, 125-458-000'
      })
    },

    routes () {
      this.namespace = 'api'

      this.get('patients')

      this.get('patients/total', (schema) => {
        return schema.all('patient').length
      })

      this.get('/patients/search', (schema, request) => {
        const { query } = request.queryParams

        return schema.patients.where((patient) => {
          return (
            patient?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            patient?.mother.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            patient?.cpf.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            patient?.cns.toLowerCase().indexOf(query.toLowerCase()) !== -1
          )
        })
      })

      this.get("/patients/:id", (schema, request) => {
        const id = request.params.id
        return schema.find("patient", id)
      })

      this.post("/patients", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        attrs.photo = `https://ui-avatars.com/api/?name=${ attrs.name }`
        return schema.create("patient", attrs)
      })

      this.put("/patients/:id", (schema, request) => {
        const id = request.params.id
        let attrs = JSON.parse(request.requestBody)
        const patient = schema.find("patient", id)
        attrs.photo = `https://ui-avatars.com/api/?name=${ attrs.name }`
        return patient.update(attrs)
      })

      this.delete("/patients/:id", (schema, request) => {
        const id = request.params.id
        const patient = schema.find("patient", id)
        return patient.destroy()
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
