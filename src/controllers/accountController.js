const apiConnection = require('../../nodeConnection');

const connectApi = apiConnection.getNodeConnection().then((api) => {
    return api;
});

exports.getAccountsCount = async (ctx) => {
    const { rows } = await ctx.app.pool.query(`SELECT COUNT(DISTINCT recipient)+COUNT(DISTINCT sender) AS count FROM transactions`);
    return rows;
}

exports.getAccountTransactionsCount = async (ctx) => {
    const accountId = ctx.params.accountId
    const { rows } = await ctx.app.pool.query(`SELECT COUNT(*) AS count FROM transactions WHERE sender='${accountId}' OR recipient='${accountId}'`);
    return rows;
}

exports.getAccountTransactions = async (ctx) => {
    const accountId = ctx.params.accountId
    const { rows } = await ctx.app.pool.query(`SELECT * FROM transactions WHERE recipient='${accountId}' OR sender='${accountId}'`);
    return rows;
}

exports.getAccountBalance = async (ctx) => {
    const accountId = ctx.params.accountId;
    return connectApi.then(api => api.query.system.account(accountId));
}