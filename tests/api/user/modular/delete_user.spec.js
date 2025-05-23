jest.setTimeout(90000);
const request = require('../../../utils/apiClient');
const createUserDataPath = require('../../../fixtures/dataDriven/user/json/DELETE/create_user_data_sucess');
const { waitForUser } = require('../../../utils/userWaitUtils');
const { setupUsers } = require('../../../utils/setupUsers');

describe('API PetStore - DDT - DELETE User', () => {
  const testData = createUserDataPath.array;

  // Cria todos os usuários antes de rodar os testes
  beforeAll(async () => {
    await setupUsers(testData);
  });

  it.each(testData.map((user) => [user.username]))(
    'DELETE User - Deve deletar o usuário com sucesso: %s',
    async (username) => {
      await waitForUser(username);

      const deleteRes = await request.delete(`/user/${username}`);
      // Validação da resposta
      expect(deleteRes.statusCode).toBe(200);

      const getRes = await request.get(`/user/${username}`);
      // Validação da resposta
      expect(getRes.statusCode).toBe(404);
    },
    40000
  );

  it('DELETE User - Deve retornar 404 ao tentar deletar um usuário inexistente', async () => {
    const nonExistentUsername = 'usuario_inexistente_42342';
    const deleteRes = await request.delete(`/user/${nonExistentUsername}`);
    // Validação da resposta
    expect(deleteRes.statusCode).toBe(404);
  });

  it('DELETE User - Deve retornar 400 ao tentar deletar um username inválido', async () => {
    const invalidUsername = '[]';
    const deleteRes = await request.delete(`/user/${invalidUsername}`);
    // Validação da resposta
    expect(deleteRes.statusCode).toBe(400);
  });
});
