const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// **Conexão com o MongoDB**
const mongoURI = "mongodb+srv://joaolsena129:uOS3YrozpMqlh4xS@cluster0.j4okv.mongodb.net/?retryWrites=true&w=majority";
 // Substitua pela sua URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// **Modelo do MongoDB**
const Projeto = mongoose.model("Projeto", {
  titulo: String,
  descricao: String,
  autor: String,
  data: String,
});

// **Rotas**
// Rota para obter todos os projetos
app.get("/projetos", async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.json(projetos);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    res.status(500).send("Erro ao buscar projetos");
  }
});

// Rota para adicionar um novo projeto
app.post("/adicionar", async (req, res) => {
  try {
    const novoProjeto = new Projeto({
      ...req.body,
      data: new Date().toLocaleDateString("pt-BR"), // Adiciona a data automaticamente
    });
    await novoProjeto.save();
    res.status(201).json(novoProjeto);
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    res.status(500).send("Erro ao adicionar projeto");
  }
});

// **Servidor**
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
