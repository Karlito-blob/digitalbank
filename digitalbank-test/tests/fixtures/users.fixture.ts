export const usersFixture = {

  jean_informations: {
    email: "jean.dupont@email.com",
    password: "Password123!",
    new_password: "NewPassword123!",
    name: "Jean Dupont",
    phone: "+33 6 12 34 56 78",
    twoFactorEnabled: false,
  },

  marie_informations: {
    email: "marie.martin@email.com",
    password: "SecurePass456!",
    name: "Marie Martin",
    phone: "+33 6 98 76 54 32",
    twoFactorEnabled: true,
  },

  test_informations: {
    email: "test@digitalbank.fr",
    password: "Test1234!",
    name: "Utilisateur Test",
    phone: "+33 6 00 00 00 00",
    twoFactorEnabled: false,
  },

} as const;