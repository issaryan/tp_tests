import { test, expect } from '@playwright/test';

test.describe('Inscription utilisateur', () => {
  test('doit pouvoir inscrire un nouvel utilisateur', async ({ page }) => {
    // Génération d'un utilisateur aléatoire
    
    
    // Étape 1: Accéder à la page d'accueil
    await test.step('Accéder à la page d\'accueil', async () => {
      await page.goto('https://ztrain-web.vercel.app/home');
    });
    
    // Étape 2: Accéder à la page d'inscription
    await test.step('Accéder à la page d\'inscription', async () => {
      // Cliquer sur le bouton "Se connecter" du header pour ouvrir le modal de connexion
      await page.locator('#style_avatar_wrapper__pEGIQ span').nth(1).click();
      
      // Cliquer sur le lien "S'inscrire" pour accéder au formulaire d'inscription
      await page.getByRole('tab', { name: 'Inscription' }).click();
      
      // Vérifier que nous sommes sur la page d'inscription
      await expect(page.locator('text=Bienvenue!!!Vos courses au')).toBeVisible();
    });
    
    // Étape 3: Remplir le formulaire d'inscription
    await test.step('Remplir le formulaire d\'inscription', async () => {
      // Remplir l'email
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill('adoumou@gmail.com');
      
      // Remplir le mot de passe
      await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).click();
      await page.getByRole('textbox', { name: 'Mot de passe', exact: true }).fill('adamou1234');
      
      // Remplir la confirmation du mot de passe
      await page.getByRole('textbox', { name: 'Confirmer votre mot de passe' }).click();
      await page.getByRole('textbox', { name: 'Confirmer votre mot de passe' }).fill('adamou1234');
    });
    
    // Étape 4: Soumettre le formulaire d'inscription
    await test.step('Soumettre le formulaire d\'inscription', async () => {
      // Cliquer sur le bouton d'inscription
      await page.getByRole('button', { name: 'Inscription' }).click();
      
      // Attendre que l'inscription soit terminée (redirection vers la page d'accueil)
      await page.waitForURL('**/home');
      
      // Vérifier que l'utilisateur est connecté (présence du bouton de profil)
      await expect(page.getByText('adoumou@gmail.com')).toBeVisible();
      
      
      
    });
    
  });
});