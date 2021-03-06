const transaction = require('../Global/Function/transaction');
const v1 = require('../Global/Function/transaction/v1');
const axios = require('axios');
const {publicDomain} = require('../Global/Variable/PublicNodeDomain');

function findSequenceAvailable(data, public_key) {
    data.reverse();
    for(const block of data)
    {
        if(block.tx.account === public_key)
            return block.tx.sequence + 1;
    }
    return 1;
}

function  encodeCreateAccountTransaction (account, address, private_key) {
    return new Promise((resolve, reject) => { 
        var req = publicDomain + "/tx_search?query=%22account=%27"+account+"%27%22&page=1&per_page=100"   
        axios.get(req)
        .then(response => {
            const data = response.data.result.txs.map((each) => {
                each.tx = decodeTransaction(each.tx);
                each.tx.memo = each.tx.memo.toString();
                each.tx.signature = each.tx.signature.toString('hex');
                return each;
            })
            var sequence = findSequenceAvailable(data, account);
            const tx = {
                version: 1, 
                operation: "create_account",
                params: {
                    address: address,
                },
                account: account,
                sequence: sequence,
                memo: Buffer.alloc(0),
            }
            transaction.sign(tx, private_key);
        
            const txEncode = "0x" + transaction.encode(tx).toString('hex')        
            resolve( txEncode);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    }, err => {
        reject(err);
    });
}

function encodePaymentTransaction  (account, address, amount, private_key) {
    return new Promise((resolve, reject) => {     
    var req = publicDomain + "/tx_search?query=%22account=%27"+account+"%27%22&page=1&per_page=100"    
        axios.get(req)
        .then(response => {
            const data = response.data.result.txs.map((each) => {
                each.tx = decodeTransaction(each.tx);
                each.tx.memo = each.tx.memo.toString();
                each.tx.signature = each.tx.signature.toString('hex');
                return each;
            })
            var sequence = findSequenceAvailable(data, account);
            const tx = {
                version: 1, 
                operation: "payment",
                params: {
                    address: address,
                    amount: amount,
                },
                account: account,
                sequence: sequence,
                memo: Buffer.alloc(0),
            }
            transaction.sign(tx, private_key);
            const txEncode =  "0x" + transaction.encode(tx).toString('hex')
            resolve(txEncode);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    }, err => {
        reject(err);
    });
}

function encodePostTransaction  (account, content, private_key) {
    return new Promise((resolve, reject) => {     
        var req = publicDomain + "/tx_search?query=%22account=%27"+account+"%27%22&page=1&per_page=100"    
        axios.get(req)
        .then(response => {
            const data = response.data.result.txs.map((each) => {
                each.tx = decodeTransaction(each.tx);
                each.tx.memo = each.tx.memo.toString();
                each.tx.signature = each.tx.signature.toString('hex');
                return each;
            })
            var sequence = findSequenceAvailable(data, account);
            const tx = {
                version: 1, 
                operation: "post",
                params: {
                    keys: [],
                    content: content,
                },
                account: account,
                sequence: sequence,
                memo: Buffer.alloc(0),
            }
            transaction.sign(tx, private_key);
            const txEncode =  "0x" + transaction.encode(tx).toString('hex')
            resolve(txEncode);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    }, err => {
        reject(err);
    });
}

function encodeUpdateNameTransaction  (account, updateNameParams, private_key) {
    return new Promise((resolve, reject) => {     
        var req = publicDomain + "/tx_search?query=%22account=%27"+account+"%27%22&page=1&per_page=100"    
        axios.get(req)
        .then(response => {
            const data = response.data.result.txs.map((each) => {
                each.tx = decodeTransaction(each.tx);
                each.tx.memo = each.tx.memo.toString();
                each.tx.signature = each.tx.signature.toString('hex');
                return each;
            })
            var sequence = findSequenceAvailable(data, account);
            const tx = {
                version: 1, 
                operation: "update_account",
                params: {
                    key: 'name',
                    value: updateNameParams,
                },
                account: account,
                sequence: sequence,
                memo: Buffer.alloc(0),
            }
            transaction.sign(tx, private_key);
            const txEncode =  "0x" + transaction.encode(tx).toString('hex')
            resolve(txEncode);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    }, err => {
        reject(err);
    });
}

function encodeUpdatePictureTransaction  (account, updatePictureParams, private_key) {
    return new Promise((resolve, reject) => {     
        var req = publicDomain + "/tx_search?query=%22account=%27"+account+"%27%22&page=1&per_page=100"    
        axios.get(req)
        .then(response => {
            const data = response.data.result.txs.map((each) => {
                each.tx = decodeTransaction(each.tx);
                each.tx.memo = each.tx.memo.toString();
                each.tx.signature = each.tx.signature.toString('hex');
                return each;
            })
            var sequence = findSequenceAvailable(data, account);
            const tx = {
                version: 1, 
                operation: "update_account",
                params: {
                    key: 'picture',
                    value: updatePictureParams,
                },
                account: account,
                sequence: sequence,
                memo: Buffer.alloc(0),
            }
            transaction.sign(tx, private_key);
            const txEncode = transaction.encode(tx).toString('base64');
            resolve(txEncode);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    }, err => {
        reject(err);
    });
}

function encodeUpdateFollowingsTransaction  (account, updateParams, private_key) {
    return new Promise((resolve, reject) => {     
        var req = publicDomain + "/tx_search?query=%22account=%27"+account+"%27%22&page=1&per_page=100"    
        axios.get(req)
        .then(response => {
            const data = response.data.result.txs.map((each) => {
                each.tx = decodeTransaction(each.tx);
                each.tx.memo = each.tx.memo.toString();
                each.tx.signature = each.tx.signature.toString('hex');
                return each;
            })
            var sequence = findSequenceAvailable(data, account);
            const tx = {
                version: 1, 
                operation: "update_account",
                params: {
                    key: 'followings',
                    value: updateParams,
                },
                account: account,
                sequence: sequence,
                memo: Buffer.alloc(0),
            }
            transaction.sign(tx, private_key);
            const txEncode =  "0x" + transaction.encode(tx).toString('hex')
            resolve(txEncode);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    }, err => {
        reject(err);
    });
}

function encodeInteractTransaction  (account, hash, content, private_key) {
    return new Promise((resolve, reject) => {     
        var req = "https://komodo.forest.network/tx_search?query=%22account=%27"+account+"%27%22&page=1&per_page=100"    
        axios.get(req)
        .then(response => {
            const data = response.data.result.txs.map((each) => {
                each.tx = decodeTransaction(each.tx);
                each.tx.memo = each.tx.memo.toString();
                each.tx.signature = each.tx.signature.toString('hex');
                return each;
            })
            var sequence = findSequenceAvailable(data, account);
            const tx = {
                version: 1, 
                operation: "interact",
                params: {
                    object: hash,
                    content: content,
                },
                account: account,
                sequence: sequence,
                memo: Buffer.alloc(0),
            }
            transaction.sign(tx, private_key);
            const txEncode =  "0x" + transaction.encode(tx).toString('hex')
            resolve(txEncode);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    }, err => {
        reject(err);
    });
}

const decodeTransaction = (data) => {  
    var transaction = v1.decode(Buffer.from(data, 'base64'));
    return transaction;
    
}

module.exports.encodeCreateAccountTransaction = encodeCreateAccountTransaction
module.exports.encodePaymentTransaction = encodePaymentTransaction
module.exports.encodePostTransaction = encodePostTransaction
module.exports.encodeUpdateNameTransaction = encodeUpdateNameTransaction
module.exports.encodeUpdatePictureTransaction = encodeUpdatePictureTransaction
module.exports.encodeUpdateFollowingsTransaction = encodeUpdateFollowingsTransaction
module.exports.encodeInteractTransaction = encodeInteractTransaction
module.exports.decodeTransaction = decodeTransaction
