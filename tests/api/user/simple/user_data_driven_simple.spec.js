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
    },
    60000
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

      const getRes = await request.get(`/user/${username}`);

      if (getRes.statusCode === 404) {
        console.log(`GET - Usuário ${username} já foi excluído`);
        return;
      }
    },
    60000
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
    async (idName, username) => {
      const updateUserData = {
        id: idName,
        username,
      };

      const res = await request.put(`/user/${username}`).send(updateUserData);

      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('unknown');
      expect(res.body.message).toBe(idName.toString());

      const getRes = await request.get(`/user/${username}`);

      if (getRes.statusCode === 404) {
        console.log(`PUT - Usuário ${username} já foi excluído`);
        return;
      }
    },
    60000
  );

  // DELETE
  it.each(testData.map((user) => [user.idName, user.username]))(
    'DELETE User - Deve remover o usuário com sucesso: %s, %s',
    async (idName, username) => {
      const userData = {
        id: idName,
        username,
      };

      const res = await request.delete(`/user/${username}`).send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.type).toBe('unknown');
      expect(res.body.message).toBe(username);

      const deleteRes = await request.get(`/user/${username}`);
      if (deleteRes.statusCode === 404) {
        console.log(`DELETE - Usuário ${username} já foi excluído`);
        return;
      }
    }
  );
});
