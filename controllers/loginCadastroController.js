const express = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { hash } = require("bcrypt");

const loginCadastroController = (req, res, next) => {
    res.render("loginCadastro", { title: "Login-Cadastro" });
};

//Cadastrar novo usuário
const cadastrarNovoUsuario = async (req, res) => {
    const image = req.file.filename;
    const { nome, email, senha } = req.body;

    async function criarHash(senha) {
        const cost = 10;
        const salt = bcrypt.genSaltSync(cost);
        const cyphertext = bcrypt.hashSync(senha, salt);
        return cyphertext;
    }

    let hashResult = await criarHash(senha);

    const usuario = {
        nome,
        email,
        senha: hashResult,
        image,
    };
    await Usuario.create(usuario);

    return res.redirect("/");
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const usuarioDataBase = await Usuario.findOne({
        attributes: ["email", "senha"],
        where: {
            email,
            // senha: req.body.senha,
        },
    });

    if (!usuarioDataBase) {
        return res.status(404).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!!!!",
        });
    }

    const match = await bcrypt.compare(senha, usuarioDataBase.senha);

    if (match) {
        return res.status(200).json({ token: true, mesage: "Sucesso!" });
    }

    return res.status(400).json({ token: false, mesage: "Erro!" });
};

module.exports = {
    loginCadastroController,
    cadastrarNovoUsuario,
    loginUsuario,
};
