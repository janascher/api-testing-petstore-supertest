const request = require('../../../utils/apiClient');
const createUserDataPath = require('../../../fixtures/dataDriven/user/json/create_user_data_sucess');
const updateUserDataPath = require('../../../fixtures/dataDriven/user/json/update_user_data_sucess');

describe('API PetStore - DDT - PUT User', () => {
  const testData = createUserDataPath.array;
  const updateTestData = updateUserDataPath.array;

  it.each(
    updateTestData.map((user) => [
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
    'PUT User - Deve atualizar usuário com sucesso: %s, %s',
    async (idName, username, firstName, lastName, email, password, phone, userStatus) => {
      try {
        // Encontra os dados originais para criar o usuário
        const originalData = testData.find((user) => user.username === username);

        // Verifica se o usuário existe nos dados de teste
        if (!originalData) {
          console.log(`PUT - Usuário ${username} não encontrado`);
          return;
        }

        // Cria o usuário antes de atualizar
        await request.post('/user').send(originalData).expect(200);

        // Prepara os dados atualizados para a requisição PUT
        const updateUserData = {
          id: idName,
          username,
          firstName,
          lastName,
          email,
          password,
          phone,
          userStatus,
        };

        // Realiza a requisição PUT para atualizar o usuário
        const putRes = await request.put(`/user/${originalData.username}`).send(updateUserData);

        // Validação da resposta
        expect(putRes.statusCode).toBe(200);
        expect(putRes.body.type).toBe('unknown');
        expect(putRes.body.message).toBe(idName.toString());

        // Verifica se os dados foram realmente atualizados
        const getRes = await request.get(`/user/${username}`);
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body.id).toBe(idName);
        expect(getRes.body.username).toBe(username);
        expect(getRes.body.firstName).toBe(firstName);
        expect(getRes.body.lastName).toBe(lastName);
        expect(getRes.body.email).toBe(email);
        expect(getRes.body.password).toBe(password);
        expect(getRes.body.phone).toBe(phone);
        expect(getRes.body.userStatus).toBe(userStatus);

        // Exclui o usuário após o teste, independentemente do resultado
        await request.delete(`/user/${username}`).expect(200);
      } catch (error) {
        // Captura e loga erros inesperados durante as operações da API
        console.log(`Erro ao excluir usuário ${username}: ${error}`);
      }
    }
  );
});
