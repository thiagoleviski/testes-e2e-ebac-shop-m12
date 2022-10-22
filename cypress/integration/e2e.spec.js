/// <reference types="cypress" />
import NomeClasse from "../support/page_objects/nome-funcionliada.page"
const infos = require("../fixtures/produto.json")
const dados = require("../fixtures/perfil.json");
const faker = require('faker');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.clearCookies()
        cy.visit('minha-conta')
        cy.login(dados.usuario,dados.senha)
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {


        NomeClasse.addProduto(
            infos[0].produto,
            infos[0].tamanho,
            infos[0].cor,
            infos[0].quantidade
        )
        NomeClasse.addProduto(
            infos[1].produto,
            infos[1].tamanho,
            infos[1].cor,
            infos[1].quantidade
        )
        NomeClasse.addProduto(
            infos[2].produto,
            infos[2].tamanho,
            infos[2].cor,
            infos[2].quantidade
        )
        NomeClasse.addProduto(
            infos[3].produto,
            infos[3].tamanho,
            infos[3].cor,
            infos[3].quantidade
        )

        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let empresaFaker = nomeFaker
        let pais = "Brasil"
        let enderecoFaker = "Rua X"
        let numero = "111"
        let cidade = "Campinas"
        let estado = "São Paulo"
        let cep = "13000-000"
        let telefone = "19988887777"


        cy.visit('checkout')

        cy.checkout(
            nomeFaker,
            sobrenomeFaker,
            empresaFaker,
            pais,
            enderecoFaker,
            numero,
            cidade,
            estado,
            cep,
            telefone
        )
    });

})