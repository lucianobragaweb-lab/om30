interface Patient {
  id?: number
  photo?: string
  name?: string
  mother?: string
  birth?: Date
  cpf?: string
  cns?: string
  address?: {
    bairro: string
    cep: string
    gia: string
    localidade: string
    logradouro: string
    uf: string
  }
}
