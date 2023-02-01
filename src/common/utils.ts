const TRANSFER_SIGNATURE = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

export function _isERC20Log(log) {
    return (
        log.topics[0] == TRANSFER_SIGNATURE
        && log.topics.length == 3 // index 0 is the signature, and then 2 indexed topics
    );
}


