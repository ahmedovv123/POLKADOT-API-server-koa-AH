exports.getTransactionsCount = async (ctx) => {
    const { rows } = await ctx.app.pool.query(`SELECT COUNT(*) AS count FROM transactions`);
    return rows;
}

exports.getTransactionsFromBlock = async (ctx) => {
    const blockHash = ctx.params.blockHash;
    const { rows } = await ctx.app.pool.query(`SELECT * FROM transactions WHERE block_hash='${blockHash}'`);
    return rows;
}

exports.getTransactionByHash = async (ctx) => {
    const transactionHash = ctx.params.transactionHash;
    const { rows } = await ctx.app.pool.query(`SELECT * FROM transactions WHERE hash='${transactionHash}'`);
    return rows;
}

exports.getXTransactionsAfterNth = async (ctx) => {
    const x = ctx.params.x;
    const n = ctx.params.n;
    const { rows } = await ctx.app.pool.query(`SELECT * FROM transactions WHERE id < ${n} AND id > ${n} - ${x} LIMIT ${x}`);
    return rows;
}
