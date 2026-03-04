export const passwordsFixture = {
    too_short: {
        value: "Aa1!",
        expected: {
            length: false,
            upper: true,
            lower: true,
            number: true,
            special: true,
        },
    },

    only_lowercase: {
        value: "password",
        expected: {
            length: true,
            upper: false,
            lower: true,
            number: false,
            special: false,
        },
    },

    only_uppercase: {
        value: "PASSWORD",
        expected: {
            length: true,
            upper: true,
            lower: false,
            number: false,
            special: false,
        },
    },

    missing_special_char: {
        value: "Password1",
        expected: {
            length: true,
            upper: true,
            lower: true,
            number: true,
            special: false,
        },
    },

    fully_compliant: {
        value: "Aa1!aaaa",
        expected: {
            length: true,
            upper: true,
            lower: true,
            number: true,
            special: true,
        },
    },
} as const;