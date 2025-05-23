jest.setTimeout(90000);
const request = require('../../../utils/apiClient');
const createUserDataPath = require('../../../fixtures/dataDriven/user/json/PUT/create_user_data_sucess');
const updateUserDataPath = require('../../../fixtures/dataDriven/user/json/PUT/update_user_data_sucess');
const { setupUsers } = require('../../../utils/setupUsers');
const { waitForUser } = require('../../../utils/userWaitUtils');
const { cleanupUsers } = require('../../../utils/cleanupUtils');

describe('API PetStore - DDT - PUT User', () => {
  const testData = createUserDataPath.array;
  const updateTestData = updateUserDataPath.array;

  // Cria todos os usuários antes de rodar os testes
  beforeAll(async () => {
    await setupUsers(testData);
  });

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
      
      // Verifica se o usuário existe antes do PUT
      const getBeforePut = await waitForUser(username);
      expect(getBeforePut.statusCode).toBe(200);

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

      const putRes = await request.put(`/user/${username}`).send(updateUserData);
      expect(putRes.statusCode).toBe(200);
      expect(putRes.body.type).toBe('unknown');
      expect(putRes.body.message).toBe(idName.toString());

      // Verifica se o usuário existe após o PUT
      const getRes = await waitForUser(username);
      expect(getRes.statusCode).toBe(200);
      expect(getRes.body.id).toBe(idName);
      expect(getRes.body.username).toBe(username);
      expect(getRes.body.firstName).toBe(firstName);
      expect(getRes.body.lastName).toBe(lastName);
      expect(getRes.body.email).toBe(email);
      expect(getRes.body.password).toBe(password);
      expect(getRes.body.phone).toBe(phone);
      expect(getRes.body.userStatus).toBe(userStatus);
    }
  );

  it('PUT User - Deve retornar 404 ao tentar atualizar usuário inexistente', async () => {
    // Gera um username que certamente não existe na base
    const nonExistentUsername = 'usuario_inexistente_19395';
    const updateUserData = {
      id: 8738038,
      username: nonExistentUsername,
      firstName: 'NomeNon',
      lastName: 'SobrenomeNon',
      email: 'emailnon@teste.com',
      password: 'senhal23',
      phone: '999999949',
      userStatus: 1,
    };

    // Tenta atualizar (PUT) e espera status 404
    const putRes = await request.put(`/user/${nonExistentUsername}`).send(updateUserData);
    expect(putRes.statusCode).toBe(404);
  });

  it('PUT User - Deve retornar 400 ao tentar atualizar com username inválido', async () => {
    const invalidUsername = '[]';
    const updateUserData = {
      id: 9956999,
      username: invalidUsername,
      firstName: 'NomeInv',
      lastName: 'SobrenomeInv',
      email: 'emailinv@teste.com',
      password: 'senhaInv123',
      phone: '969999969',
      userStatus: 1,
    };

    const putRes = await request.put(`/user/${invalidUsername}`).send(updateUserData);
    expect(putRes.statusCode).toBe(400);
  });

  // Limpeza dos usuários criados após os testes
  afterAll(async () => {
    await cleanupUsers(updateTestData.map((user) => user.username));
  });
});
