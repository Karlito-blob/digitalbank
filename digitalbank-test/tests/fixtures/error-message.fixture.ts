import { error } from "console";

export const messagesFixture = {
    error_messages: {
        invalid_credentials: "Email ou mot de passe incorrect",
        invalid_password: "Mot de passe actuel incorrect",
        invalid_matching_password: "Les mots de passe ne correspondent pas",
        invalid_verification_code: "Code de vérification incorrect",
        no_account_for_email: "Aucun compte associé à cette adresse email",
        insufficient_montant: "Le montant doit être supérieur à 0",
        insufficient_funds: "Solde insuffisant pour effectuer ce virement",
        missing_destinataire: "Veuillez sélectionner un compte destinataire",
        invalid_iban: "IBAN invalide. Format attendu: FR76 XXXX XXXX XXXX XXXX XXXX XXX"
    },
    valid_credentials: {
        reset_link_sent: "Un lien de réinitialisation a été envoyé à votre adresse email",
        success_virement: 'Virement effectué avec succès !'
    }
} as const;