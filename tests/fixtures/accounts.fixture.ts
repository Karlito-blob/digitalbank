export const accountsFixture = {

  jean_accounts: [
    {
      id: 1,
      type: "Compte Courant",
      number: "FR76 1234 5678 9012 3456 7890 123",
      balance: 3547.82,
    },
    {
      id: 2,
      type: "Livret A",
      number: "FR76 1234 5678 9012 3456 7890 456",
      balance: 12500.0,
    },
  ],

  marie_accounts: [
    {
      id: 3,
      type: "Compte Courant",
      number: "FR76 9876 5432 1098 7654 3210 789",
      balance: 8923.45,
    },
  ],

  test_accounts: [
    {
      id: 4,
      type: "Compte Courant",
      number: "FR76 0000 1111 2222 3333 4444 555",
      balance: 5000.0,
    },
    {
      id: 5,
      type: "Livret A",
      number: "FR76 0000 1111 2222 3333 4444 666",
      balance: 15000.0,
    },
  ],

} as const;