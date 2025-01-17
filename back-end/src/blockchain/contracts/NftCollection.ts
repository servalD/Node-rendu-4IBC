import { Address, decodeEventLog, getContract, isAddress } from "viem";
import NftCollectionJson from "../../abis/NftCollection.json";
import BlockchainClient from "../BlockchainClient";

export default class NftCollection {
  private static instances: Map<string, NftCollection> = new Map();

  private contract;

  private constructor(address: string) {
    if (!isAddress) {
      throw new Error("Invalid address");
    }
    this.contract = getContract({
      address: address as Address,
      abi: NftCollectionJson.abi,
      client: {
        public: BlockchainClient.getInstance().publicClient,
        wallet: BlockchainClient.getInstance().walletClient,
      },
    });
  }

  public static getInstance(address: Address): NftCollection {
    if (!NftCollection.instances.has(address)) {
      NftCollection.instances.set(address, new NftCollection(address));
    }
    return NftCollection.instances.get(address)!;
  }

  public async tokenCount() {
    return this.contract.read.tokenCount() as Promise<bigint>;
  }

  public async ownerOf(tokenId: number) {
    return this.contract.read.ownerOf([tokenId]) as Promise<Address>;
  }

  public async tokenURI(tokenId: number) {
    return this.contract.read.tokenURI([tokenId]) as Promise<string>;
  }

  public async name() {
    return this.contract.read.name() as Promise<string>;
  }

  public async symbol() {
    return this.contract.read.symbol() as Promise<string>;
  }

  public async owner() {
    return this.contract.read.owner() as Promise<Address>;
  }

  public decodeEventLog(
    data: `0x${string}` | undefined,
    topics: [] | [signature: `0x${string}`, ...args: `0x${string}`[]]
  ) {
    return decodeEventLog({
      abi: NftCollectionJson.abi,
      data,
      topics,
    });
  }
}
