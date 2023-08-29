describe('Teste E-commerce', () => {
  it('Inclusão de produto ao carrinho em uma loja virtual', () => {
    
    //Acessa url do e-commerce escolhido para teste
    cy.visit('https://www.lojamirante.com.br/');

    // Fecha banner na tela
    cy.get('.kvztOp > .BlockReadOnly__BlockContainerReadOnly-sc-1sk33k3-0 > .DismissPopupBlock__Container-ubmctd-0 > .DismissPopupBlock__Button-ubmctd-1').should('be.visible').trigger('click');

    // Acessa menu moleton
    cy.get(':nth-child(5) > [href="https://www.lojamirante.com.br/c/moletom"]').contains('Moletom').should('be.visible').click();

    // Verifica se esta na pagina de moletons
    cy.url().should('include', '/c/moletom');

    // Scrola até pedido desejado
    cy.get(':nth-child(16) > .produto > .itens-prod > :nth-child(3) > .produto-titulo').scrollIntoView();

    // Selecione moleton preto
    cy.contains('Moletom Canguru com Capuz Feminino Preto').should('be.visible').click({force: true});
    
    // Verifica se esta na página do moleton preto
    cy.url().should('include', '/p/moletom/casaco-de-moletom-feminino-/unit/moletom-canguru-com-capuz-feminino-preto-');

    // Seta variáriavel com elemento da quantidade de produto
    let comoboxG = '#addToCart > ul.tamanhos.d-flex > li.d-grid:nth-child(4) > span.select2.select2-container > span.selection > span';

    // Selecione 2 moletons do tamanho G
    cy.get(comoboxG, {timeout:9000}).should('exist');
    cy.get(comoboxG).click({force: true});
    cy.get('.select2-results > ul > li:nth-child(3)').click();

    // Adiciona produto no carrinho
    cy.get('#buyButtonProduct').click({force: true});

    // Acessa carinho de compras
    cy.get('.btn[href="https://www.lojamirante.com.br/carrinho"]').should('be.visible').click();

    // Ignorar erro do site
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    });

    // Verifica se esta na página do carrinho de compras
    cy.url().should('include', '/carrinho');

    // Verifica se apenas 1 tipo produto foi adicionado
    cy.get('.tabela-produtos-body > .tabela-produtos-row').should('have.length', 1);

    // Verifica as descrições do produto adicionado (nome, tamanho e quantidade)
    cy.contains('Moletom Canguru com Capuz Feminino Preto').should('be.visible');
    cy.contains('Tamanho G').should('be.visible');
    cy.contains('select', '2').should('be.visible');

  })
})