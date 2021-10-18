const apiConnection = require("../../nodeConnection");

const connectApi = apiConnection.getNodeConnection().then((api) => {
    return api;
});

exports.getLastBlock = async (ctx) => {
    return connectApi.then(api => api.rpc.chain.getBlock())
}

exports.getBlockHashByNumber = async (ctx) => {
    const blockNumber = ctx.params.blockNumber;
    return connectApi.then(api => api.rpc.chain.getBlockHash(blockNumber));
}

exports.getBlockByHash = async (ctx) => {
    const blockHash = ctx.params.blockHash;
    return connectApi.then(api => api.rpc.chain.getBlock(blockHash));
}

exports.getXBlocksAfterNth = async (ctx) => {
    const x = ctx.params.x;
    const n = ctx.params.n;

    return connectApi.then( async api => {
        let i = 1;
        let blocks = [];
        
        while (i <= x)  {
            let tempBlock = await api.rpc.chain.getBlockHash(n-i);
            blocks.push(tempBlock);
            i++;
        }

        return blocks;
    })
}