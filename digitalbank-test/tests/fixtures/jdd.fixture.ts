import { usersFixture } from "./users.fixture";
import { accountsFixture } from "./accounts.fixture";
import { transactionsFixture } from "./transactions.fixture";
import { beneficiaireFixture } from "./beneficiary.fixture";

export const jddJean = {
  user: usersFixture.jean_informations,
  accounts: accountsFixture.jean_accounts,
  transactions: transactionsFixture.jean_transactions,
  beneficiaires: beneficiaireFixture.jean_beneficiaire
};

export const jddTest = {
  user: usersFixture.test_informations,
  accounts: accountsFixture.test_accounts,
  transactions: transactionsFixture.test_transactions,
};

export const jddMarie = {
  user: usersFixture.marie_informations,
  accounts: accountsFixture.marie_accounts,
  beneficiaires: beneficiaireFixture.marie_beneficiaire
};