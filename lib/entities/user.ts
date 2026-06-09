export type User = { password: string } & UserWithoutPassword

export type UserWithoutPassword = {
    id: string,
    nome: string,
    cognome: string
}