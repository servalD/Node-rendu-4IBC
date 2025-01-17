import { Address, decodeEventLog, getContract, isAddress } from "viem";
import BasicContractAbi from "../../abis/BasicContract.json";
import BlockchainClient from "../BlockchainClient";

export default class BasicContract {
  private static instances: Map<string, BasicContract> = new Map();

  private contract;

  private constructor(address: string) {
    if (!isAddress) {
      throw new Error("Invalid address");
    }
    this.contract = getContract({
      address: address as Address,
      abi: BasicContractAbi.abi,
      client: {
        public: BlockchainClient.getInstance().publicClient,
        wallet: BlockchainClient.getInstance().walletClient,
      },
    });
  }

  public static getInstance(address: Address): BasicContract {
    if (!BasicContract.instances.has(address)) {
      BasicContract.instances.set(address, new BasicContract(address));
    }
    return BasicContract.instances.get(address)!;
  }

  public async payableValue() {
    return this.contract.read.payableValue() as Promise<string>;
  }

  public async value() {
    return this.contract.read.value() as Promise<Address>;
  }

  public decodeEventLog(
    data: `0x${string}` | undefined,
    topics: [] | [signature: `0x${string}`, ...args: `0x${string}`[]]
  ) {
    return decodeEventLog({
      abi: BasicContractAbi.abi,
      data,
      topics,
    });
  }
}
