import { Address, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

export default class BlockchainClient {
  private static instance: BlockchainClient;

  public static getInstance() {
    if (!BlockchainClient.instance) {
      BlockchainClient.instance = new BlockchainClient();
    }
    return BlockchainClient.instance;
  }

  public publicClient = createPublicClient({
    chain: sepolia,
    transport: http("https://sepolia.drpc.org"),
  });

  public walletClient = createWalletClient({
    chain: sepolia,
    transport: http("https://sepolia.drpc.org"),
    account: privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`),
  });
}
