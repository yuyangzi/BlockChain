import { createHash } from 'crypto';
import { BlockDataModel } from './model/blockData.model';

class BlockChain {
  constructor() {
    const timestamp = new Date().getTime();
    const height = this.blockChain.length;
    const data = '创世区块';
    const preHash = '0';
    const nonce = 0;
    const hash = BlockChain.computeHash(
      height,
      data,
      timestamp,
      preHash,
      nonce
    );
    const genesisBlock = new BlockDataModel(
      height,
      data,
      timestamp,
      preHash,
      hash,
      nonce
    );
    this.blockChain.push(genesisBlock);
  }

  // 区块链
  public blockChain: BlockDataModel[] = [];

  // 难度系数
  public difficulty = 2;

  // 区块数据
  public blockData: any = null;

  // 计算哈希值
  public static computeHash(
    height: number,
    data: any,
    timestamp: number,
    preHash: string,
    nonce: number
  ): string {
    return createHash('sha256')
      .update(height + data + timestamp + preHash + nonce)
      .digest('hex');
  }

  public getLastBlock(): BlockDataModel {
    return this.blockChain[this.blockChain.length - 1] || new BlockDataModel();
  }

  // 挖矿
  public mine() {
    const newBlockData = this.generatorNewBlock();
    if (this.verifyBlock(newBlockData)) {
      this.blockChain.push(newBlockData);
    } else {
      console.log('Error');
    }
  }

  // 生成新区块
  public generatorNewBlock(): BlockDataModel {
    // 随机数初始值
    let nonce = 0;
    // 当前区块高度
    const height = this.blockChain.length;
    // 当期区块需要打包的数据
    const data = this.blockData;
    // 当前时间戳
    let timestamp = new Date().getTime();
    // 上一个区块的hash值
    const preHash = this.getLastBlock().hash || '0';
    let currentHash = BlockChain.computeHash(
      height,
      data,
      timestamp,
      preHash,
      nonce
    );
    while (
      currentHash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)
    ) {
      nonce += 1;
      timestamp = new Date().getTime();
      currentHash = BlockChain.computeHash(
        height,
        data,
        timestamp,
        preHash,
        nonce
      );
    }
    return new BlockDataModel(
      height,
      data,
      timestamp,
      preHash,
      currentHash,
      nonce
    );
  }

  // 验证区块
  public verifyBlock(newBlockData: BlockDataModel): boolean {
    const lastBlockData = this.getLastBlock();
    // 1. 新区块的height是否为当前区块中最后一个区块height + 1
    // 2. 新区快的时间戳是否大于当前区块中最后一个区块的时间戳
    // 3. 新区块的preHash是否等于当前区块中最后一个区块的hash
    // 4. 新区块计算出来的hash值是否有效
    if (newBlockData.height !== lastBlockData.height + 1) {
      return false;
    } else if (newBlockData.timestamp <= lastBlockData.timestamp) {
      return false;
    } else if (newBlockData.preHash !== lastBlockData.hash) {
      return false;
    } else if (
      newBlockData.hash.slice(0, this.difficulty) !==
      '0'.repeat(this.difficulty)
    ) {
      return false;
    }
    return true;
  }

  // 验证区块链
  public verifyBlockChain() {}
}

const blockChain = new BlockChain();
