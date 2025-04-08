import { test, expect } from '@playwright/test';

test.describe('Ajout de produit au panier', () => {
  test.describe.configure({ mode: 'serial' });
  test('doit pouvoir ajouter un produit au panier', async ({ page }) => {
    
    
    // Étape 1: Accéder à la page d'accueil et se connecter
    await test.step('Accéder à la page d\'accueil et se connecter', async () => {
         await page.goto('https://ztrain-web.vercel.app/home');

      
      // Vérifier si l'utilisateur est déjà connecté
      const isConnected = expect(page.locator('#style_avatar_wrapper__pEGIQ')).toBeVisible();
      
      if (!isConnected) {
        // Se connecter si nécessaire
        await test.step('Accéder à la page de connexion', async () => {
      // Cliquer sur le bouton "Se connecter" pour ouvrir le modal de connexion
      await page.locator('#style_avatar_wrapper__pEGIQ span').nth(1).click();
      await page.getByRole('tab', { name: 'Connexion' }).click();
      // Vérifier que nous sommes sur la page de connexion
      await expect(page.locator('text=Bienvenue!!!Vos courses au')).toBeVisible();

    });
    
    // Étape 3: Remplir le formulaire de connexion
    await test.step('Remplir le formulaire de connexion', async () => {
      // Remplir l'email
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill('adamou@gmail.com');
      
      // Remplir le mot de passe
      await page.getByRole('textbox', { name: 'Mot de passe' }).click();
      await page.getByRole('textbox', { name: 'Mot de passe' }).fill('adamou1234');
    });
    
    // Étape 4: Soumettre le formulaire de connexion
    await test.step('Soumettre le formulaire de connexion', async () => {
      // Cliquer sur le bouton de connexion
      await page.getByRole('button', { name: 'Connexion', exact: true }).click();
      
      // Attendre que la connexion soit terminée (redirection vers la page d'accueil)
      await page.waitForURL('**/home');
      
      // Vérifier que l'utilisateur est connecté (présence du bouton de profil)
      await expect(page.getByText('adamou@gmail.com')).toBeVisible();
      
    });
  
      }
    });
    
    // Étape 2: Naviguer vers la liste des produits
    await test.step('Naviguer vers la liste des produits', async () => {
      // Vérifier si nous sommes déjà sur la page d'accueil qui contient les produits
      const currentUrl = page.url();
      if (!currentUrl.includes('/home')) {
        await page.goto('/home');
      }
      
      // Vérifier que les produits sont visibles
      await expect(page.getByText('LES PRODUITSAmpoule Vecteur')).toBeVisible();
    });
    
    // Étape 3: Sélectionner un produit et l'ajouter au panier
    await test.step('Sélectionner un produit et l\'ajouter au panier', async () => {
      // Récupérer le nombre d'articles dans le panier avant l'ajout
      const cartItemsBeforeText = await page.locator('#style_content_cart_wrapper__mqNbf').textContent() || '0';
      const cartItemsBefore = parseInt(cartItemsBeforeText, 10) || 0;
      
      // Sélectionner le premier produit disponible
      const firstProduct = await page.locator('.style_card_body_img__mkV1D').first();
      
      // Obtenir le nom du produit pour vérification
      const productName = await page.locator('#style_detail_wrapper__a7fpS').getByRole('heading', { name: 'Ampoule Vecteur Incandescent' });
      console.log(`Produit sélectionné: ${productName}`);
      
      // Cliquer sur le bouton d'ajout au panier du premier produit
       await page.getByText('LES PRODUITSAmpoule Vecteur').click();
       await page.locator('.style_card_body_img__mkV1D').first().click();
       await page.getByRole('button', { name: 'Ajouter au panier' }).click();
       
      // Attendre que le produit soit ajouté au panier (la notification apparaît)
      await expect(page.locator('div').filter({ hasText: 'Ajout produit au panier' }).nth(1)).toBeVisible();
      
      // Vérifier que le nombre d'articles dans le panier a augmenté
      const cartItemsAfterText = await page.locator('#style_content_cart_wrapper__mqNbf').textContent() || '0';
      const cartItemsAfter = parseInt(cartItemsAfterText, 10) || 0;
      
      expect(cartItemsAfter).toBeGreaterThan(cartItemsBefore);
      console.log(`Nombre d'articles avant: ${cartItemsBefore}, après: ${cartItemsAfter}`);
    });
    
    // Étape 4: Vérifier le contenu du panier
    await test.step('Vérifier le contenu du panier', async () => {
      // Accéder au panier
      await page.locator('#style_content_cart_wrapper__mqNbf').click();
      // Attendre que le panier soit chargé
      await expect(page.getByRole('dialog').locator('div').nth(1)).toBeVisible();
      
      // Vérifier qu'il y a au moins un produit dans le panier
      const cartItems = await page.locator('#style_card_wrapper__hrc1I').count();
      expect(cartItems).toBeGreaterThan(0);
      console.log(`Nombre de produits différents dans le panier: ${cartItems}`);
    });

  });
});