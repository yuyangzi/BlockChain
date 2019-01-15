export class BlockDataModel {
  // 区块高度
  height: number;
  // 区块数据
  data: any;
  // 区块生成时间戳
  timestamp: number;
  // 上一个区块的Hash
  preHash: string;
  // Hash
  hash: string;
  // 随机数
  nonce: number;

  constructor(
    height?: number,
    data?: any,
    timestamp?: number,
    preHash?: string,
    hash?: string,
    nonce?: number
  ) {
    this.height = height;
    this.data = data;
    this.timestamp = timestamp;
    this.preHash = preHash;
    this.hash = hash;
    this.nonce = nonce;
  }
}
