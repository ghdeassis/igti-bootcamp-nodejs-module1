import AccountRepository from "../repositories/account.repository.js";

async function createAccount(account) {
    return await AccountRepository.insertAccount(account);
}

async function getAccounts() {
    return await AccountRepository.getAccounts();
}

async function getAccount(id) {
    return await AccountRepository.getAccount(id);
}

async function deleteAccount(id) {
    return await AccountRepository.deleteAccount(id);
}

async function updateAccount(account) {
    return await AccountRepository.updateAccount(account);
}

async function updateBalance(account) {
    const acc = await AccountRepository.getAccount(account.id);
    acc.balance = account.balance;
    return await AccountRepository.updateAccount(acc); 
}

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}