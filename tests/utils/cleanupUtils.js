const request = require('../utils/apiClient');
async function cleanupUsers(usernames) {
  for (const username of usernames) {
    try {
      const deleteRes = await request.delete(`/user/${username}`);
      if (![200, 404].includes(deleteRes.statusCode)) {
        console.log(`DELETE ${username}: status inesperado ${deleteRes.statusCode}`);
      }
    } catch (err) {
      console.log(`Erro ao deletar ${username}:`, err.message);
    }
  }
}

module.exports = { cleanupUsers };
