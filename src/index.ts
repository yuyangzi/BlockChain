import { createHash } from 'crypto'

class BlockChain {
  constructor() {
    this.blockData = '创世区块'
  }

  public blockChain: any[] = []

  public difficulty = 2

  public blockData: any = null

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
      .digest('hex')
  }

  public getLastBlock() {
    return this.blockChain[this.blockChain.length - 1] || {}
  }

  // 挖矿
  public mine() {
    // 随机数初始值
    let nonce = 0
    // 当前区块高度
    const height = this.blockChain.length
    // 当期区块需要打包的数据
    const data = this.blockData
    // 当前时间戳
    const timestamp = new Date().getTime()
    // 上一个区块的hash值
    const preHash = this.getLastBlock().hash || '0'
    let currentHash = BlockChain.computeHash(
      height,
      data,
      timestamp,
      preHash,
      nonce
    )
    while (
      currentHash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)
    ) {
      nonce += 1
      currentHash = BlockChain.computeHash(
        height,
        data,
        timestamp,
        preHash,
        nonce
      )
      console.log(nonce, currentHash)
    }
  }

  // 生成新区块
  public generaterNewBlock() {}

  // 验证区块
  public verifyBlock() {}

  // 验证区块链
  public verifyBlockChain() {}
}

const blockChain = new BlockChain()
blockChain.mine()
