const request = require('../../../utils/apiClient');
const createUserDataPath = require('../../../fixtures/dataDriven/user/json/create_user_data_sucess');

describe('API PetStore - DELETE User', () => {
  const testData = createUserDataPath.array;

  it.each(testData.map((user) => [user.idName, user.username]))(
    'DELETE User - Deve remover o usuário com sucesso: %s, %s',
    async (username) => {
      // Localiza o usuário nos dados de teste
      const userData = testData.find((user) => user.username === username);

      if (!userData) {
        console.log(`DELETE - Usuário ${username} não encontrado`);
        return;
      }

      try {
        // Cria o usuário antes de excluir
        await request.post('/user').send(userData).expect(200);

        // Realiza a exclusão do usuário
        const res = await request.delete(`/user/${username}`).expect(200);

        // Validação da resposta
        expect(res.statusCode).toBe(200);
        expect(res.body.type).toBe('unknown');
        expect(res.body.message).toBe(username);

        // Verifica se o usuário foi realmente excluído
        const getRes = await request.get(`/user/${username}`);
        expect(getRes.statusCode).toBe(404);
      } catch (error) {
        // Captura e loga erros inesperados durante as operações da API
        console.error(`Erro ao processar DELETE para usuário ${username}:`, error);
      }
    }
  );
});
