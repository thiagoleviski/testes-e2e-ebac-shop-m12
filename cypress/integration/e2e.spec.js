/// <reference types="cypress" />
import ProdutosConfig from "../support/page_objects/nome-funcionliada.page"
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


        ProdutosConfig.addProduto(
            infos[0].produto,
            infos[0].tamanho,
            infos[0].cor,
            infos[0].quantidade
        )
        ProdutosConfig.addProduto(
            infos[1].produto,
            infos[1].tamanho,
            infos[1].cor,
            infos[1].quantidade
        )
        ProdutosConfig.addProduto(
            infos[2].produto,
            infos[2].tamanho,
            infos[2].cor,
            infos[2].quantidade
        )
        ProdutosConfig.addProduto(
            infos[3].produto,
            infos[3].tamanho,
            infos[3].cor,
            infos[3].quantidade
        )

        cy.get('[class="mini-cart-items"]:contains(4)').should('be.visible')

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

        cy.get('address').contains(`${nomeFaker} ${sobrenomeFaker}`).should('be.visible')
        cy.get('address').contains(empresaFaker).should('be.visible')
        cy.get('address').contains(enderecoFaker).should('be.visible')
        cy.get('address').contains(numero).should('be.visible')
        cy.get('address').contains(cidade).should('be.visible')
        cy.get('address').contains(estado).should('be.visible')
        cy.get('address').contains(cep).should('be.visible')
        cy.get('address').contains(telefone).should('be.visible')
    });

})