jest.setTimeout(90000);
const request = require('../../../utils/apiClient');
const createUserDataPath = require('../../../fixtures/dataDriven/user/json/GET/create_user_data_sucess');
const { cleanupUsers } = require('../../../utils/cleanupUtils');
const { setupUsers } = require('../../../utils/setupUsers');
const { waitForUser } = require('../../../utils/userWaitUtils');

describe('API PetStore - DDT - GET User', () => {
  const testData = createUserDataPath.array;

  // Cria todos os usuários antes de rodar os testes
  beforeAll(async () => {
    await setupUsers(testData);
  });

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
      await waitForUser(username);

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
    }
  );

  it('GET User - Deve retornar 404 ao tentar atualizar usuário inexistente', async () => {
    const nonExistentUsername = 'usuario_inexistente_12445';
    const putRes = await request.get(`/user/${nonExistentUsername}`);
    // Validação da resposta
    expect(putRes.statusCode).toBe(404);
  });

  it('GET User - Deve retornar 400 ao tentar atualizar com username inválido', async () => {
    const invalidUsername = '[]';
    const putRes = await request.get(`/user/${invalidUsername}`).send(testData);
    // Validação da resposta
    expect(putRes.statusCode).toBe(400);
  });

  // Limpeza dos usuários criados após os testes
  afterAll(async () => {
    await cleanupUsers(testData.map((user) => user.username));
  });
});
