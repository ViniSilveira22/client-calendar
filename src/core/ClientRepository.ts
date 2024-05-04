import Client from "./Client";

export default interface ClientRepository {
  save(client: Client): Promise<Client> // esse método espera receber um client do tipo Client e retorna uma promise do tipo Client
  delete(client: Client): Promise<void> // esse método espera receber um client do tipo Client e retorna uma promise vazia
  getAll(): Promise<Client[]> // esse método  não espera receber nada e retorna uma promise do tipo Client, que na verdade é um array/lista de clientes
}