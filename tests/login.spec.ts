import { test, expect } from '@playwright/test';

test.describe('Connexion utilisateur', () => {
  test.describe.configure({ mode: 'serial' });
  test('doit pouvoir se connecter avec un compte existant', async ({ page }) => {
    
    
    // Étape 1: Accéder à la page d'accueil
    await test.step('Accéder à la page d\'accueil', async () => {
      await page.goto('https://ztrain-web.vercel.app/home');
      //await expect(page).toHaveTitle(/ZTrain/);
    });
    
    // Étape 2: Accéder à la page de connexion
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
  });
});