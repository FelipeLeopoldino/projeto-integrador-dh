const Produto = require("../models/Produto");

const painelAdminController = (req, res, next) => {
    res.render("painelAdmin", { title: "Painel Admin" });
};

//Cadastrar novo produto
const cadastrarNovoProduto = async (req, res) => {
    const image = req.file.filename;
    const { produto, preco, detalhes, descricao } = req.body;

    const produtos = {
        produto,
        preco,
        detalhes,
        descricao,
        image,
    };

    console.log(produtos);

    await Produto.create(produtos);

    return res.redirect("/painelAdmin");
};

// listar os produtos
const renderizarProdutos = async (req, res) => {
    const produtos = await Produto.findAll();
    return res.render("renderizarProdutos", { produtos });
};

console.log("painelAdminController");

module.exports = {
    painelAdminController,
    cadastrarNovoProduto,
    renderizarProdutos,
};
