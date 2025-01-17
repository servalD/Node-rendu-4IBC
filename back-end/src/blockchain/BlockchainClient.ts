import { createPublicClient, createWalletClient, http } from "viem";
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
    transport: http(),
  });

  public walletClient = createWalletClient({
    chain: sepolia,
    transport: http(),
    account: privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`),
  });
}
