jest.setTimeout(90000);
const request = require('../../../utils/apiClient');
const createUserDataPath = require('../../../fixtures/dataDriven/user/json/POST/create_user_data_sucess');
const { cleanupUsers } = require('../../../utils/cleanupUtils');

describe('API PetStore - DDT - POST User', () => {
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
    'POST User - Deve criar usuário com sucesso: %s, %s',
    async (idName, username, firstName, lastName, email, password, phone, userStatus) => {
      // Prepara os dados do usuário para a requisição POST
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

      // Realiza a requisição POST para criar o usuário
      const res = await request.post('/user').send(userData);

      // Validação da resposta
      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('unknown');
      expect(res.body.message).toBe(idName.toString());
    }
  );

  // Limpeza dos usuários criados após os testes
  afterAll(async () => {
    await cleanupUsers(testData.map((user) => user.username));
  });
});
