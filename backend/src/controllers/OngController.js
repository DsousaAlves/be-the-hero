const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const ongs = await connection("ong").select("*");

    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString("HEX");

    try {
      await connection("ong").insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });
    } catch (error) {
      response.json({ error: "Não foi possível inserir o registro" });
    }

    return response.json({ id });
  }
};
