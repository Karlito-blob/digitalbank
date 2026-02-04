export const transactionsFixture = {
    jean_transactions: [
        {
            id: 1,
            date: "2025-01-10",
            description: "Virement reçu - Salaire",
            amount: 2850.0,
            type: "credit",
        },
        {
            id: 2,
            date: "2025-01-09",
            description: "Paiement CB - Carrefour",
            amount: -87.32,
            type: "debit",
        },
        {
            id: 3,
            date: "2025-01-08",
            description: "Prélèvement - EDF",
            amount: -124.5,
            type: "debit",
        },
        {
            id: 4,
            date: "2025-01-07",
            description: "Virement émis - Loyer",
            amount: -950.0,
            type: "debit",
        },
        {
            id: 5,
            date: "2025-01-05",
            description: "Paiement CB - Amazon",
            amount: -45.99,
            type: "debit",
        },
    ],

    test_transactions: [
        {
            id: 6,
            date: "2025-01-10",
            description: "Virement reçu - Salaire",
            amount: 3200.0,
            type: "credit",
        },
        {
            id: 7,
            date: "2025-01-08",
            description: "Paiement CB - Restaurant",
            amount: -42.5,
            type: "debit",
        },
        {
            id: 8,
            date: "2025-01-06",
            description: "Prélèvement - Internet",
            amount: -39.99,
            type: "debit",
        },
    ],
} as const;