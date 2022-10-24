class ProdutosConfig {

    addProduto(produto,tamanho,cor,quantidade){
        cy.visit('produtos')
        cy.get('[class="product-block grid"]').eq(produto).click()
        cy.get('.button-variable-item-'+tamanho).click()
        cy.get('.button-variable-item-'+cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }

}

export default new ProdutosConfig()