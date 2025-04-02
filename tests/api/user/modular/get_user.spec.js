const request = require('../../../utils/apiClient');
const createUserDataPath = require('../../../fixtures/dataDriven/user/json/create_user_data_sucess');

describe('API PetStore - DDT - GET User', () => {
  const testData = createUserDataPath.array;

  it.each(
    testData.map((user) => [
      user.idName,
      user.username,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.phone,
      user.userStatus,
    ])
  )(
    'GET User - Deve retornar os dados do usuário com sucesso: %s, %s',
    async (idName, username, firstName, lastName, email, password, phone, userStatus) => {
      // Prepara os dados do usuário para a requisição
      const userData = {
        id: idName,
        username,
        firstName,
        lastName,
        email,
        password,
        phone,
        userStatus,
      };

      try {
        // Cria o usuário antes de buscar para garantir que ele exista
        await request.post('/user').send(userData).expect(200);

        // Realiza a requisição GET para obter os dados do usuário
        const res = await request.get(`/user/${username}`);

        // Validação da resposta
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(idName);
        expect(res.body.username).toBe(username);
        expect(res.body.firstName).toBe(firstName);
        expect(res.body.lastName).toBe(lastName);
        expect(res.body.email).toBe(email);
        expect(res.body.password).toBe(password);
        expect(res.body.phone).toBe(phone);
        expect(res.body.userStatus).toBe(userStatus);

        // Exclui o usuário após o teste, independentemente do resultado
        await request.delete(`/user/${username}`).expect(200);
      } catch (error) {
        // Captura e loga erros inesperados durante as operações da API
        console.log(`Erro ao excluir usuário ${username}: ${error}`);
      }
    }
  );
});
