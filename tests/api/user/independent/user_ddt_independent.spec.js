const request = require('../../../utils/apiClient');
const createUserDataPath = require('../../../fixtures/dataDriven/user/json/create_user_data_sucess');
const updateUserDataPath = require('../../../fixtures/dataDriven/user/json/update_user_data_sucess');

describe('API PetStore - Data Driven - CRUD da Entidade User', () => {
  const testData = createUserDataPath.array;
  const updateTestData = updateUserDataPath.array;

  // POST
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

      const res = await request.post('/user').send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('unknown');
      expect(res.body.message).toBe(idName.toString());

      // Exclui o usuário após o teste
      await request.delete(`/user/${username}`).expect(200);
    }
    // 60000
  );

  // GET
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

      // Cria o usuário antes de buscar
      await request.post('/user').send(userData).expect(200);

      const res = await request.get(`/user/${username}`).send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(idName);
      expect(res.body.username).toBe(username);
      expect(res.body.firstName).toBe(firstName);
      expect(res.body.lastName).toBe(lastName);
      expect(res.body.email).toBe(email);
      expect(res.body.password).toBe(password);
      expect(res.body.phone).toBe(phone);
      expect(res.body.userStatus).toBe(userStatus);

      // Exclui o usuário após o teste
      await request.delete(`/user/${username}`).expect(200);

      // const getRes = await request.get(`/user/${username}`);

      // if (getRes.statusCode === 404) {
      //   console.log(`GET - Usuário ${username} já foi excluído`);
      //   return;
      // }
    }
    // 60000
  );

  // PUT
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
      // Encontra os dados originais para criar o usuário
      const originalData = testData.find((user) => user.username === username);

      if (!originalData) {
        console.log(`PUT - Usuário ${username} não encontrado`);
        return;
      }

      // Cria o usuário antes de atualizar
      await request.post('/user').send(originalData).expect(200);

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

      const res = await request.put(`/user/${username}`).send(updateUserData);

      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('unknown');
      expect(res.body.message).toBe(idName.toString());

      // Exclui o usuário após o teste
      await request.delete(`/user/${username}`).expect(200);

      // const getRes = await request.get(`/user/${username}`);

      // if (getRes.statusCode === 404) {
      //   console.log(`PUT - Usuário ${username} já foi excluído`);
      //   return;
      // }
    }
    // 60000
  );

  // DELETE
  it.each(testData.map((user) => [user.idName, user.username]))(
    'DELETE User - Deve remover o usuário com sucesso: %s, %s',
    async (idName, username) => {
      // Cria o usuário antes de excluir
      const userData = testData.find((user) => user.username === username);

      if (!userData) {
        console.log(`DELETE - Usuário ${username} não encontrado`);
        return;
      }

      await request.post('/user').send(userData).expect(200);

      // const userData = {
      //   id: idName,
      //   username,
      // };

      const res = await request.delete(`/user/${username}`).send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('unknown');
      expect(res.body.message).toBe(username);

      // Verifica se o usuário foi realmente excluído
      const getRes = await request.get(`/user/${username}`);
      expect(getRes.statusCode).toBe(404);

      // const deleteRes = await request.get(`/user/${username}`);
      // if (deleteRes.statusCode === 404) {
      //   console.log(`DELETE - Usuário ${username} já foi excluído`);
      //   return;
      // }
    }
  );
});
