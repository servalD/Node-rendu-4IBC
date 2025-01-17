import { Address } from "viem";
import UserCreateRequestResource from "../../../commons/dist/resources/user/UserCreateRequestResource";
import DbClient from "../databases/DbClient";
import NftCollection from "../blockchain/contracts/NftCollection";
import IpfsService from "./IpfsService";
import S3Service from "./S3Service";
import logger from "./LoggerService";

const ipfsService = IpfsService.getInstance();
export default class CollectionService {
  private static collectionService: CollectionService;

  public static getInstance() {
    if (!this.collectionService) {
      this.collectionService = new CollectionService();
    }

    return this.collectionService;
  }

  private dbClient: DbClient = DbClient.getInstance();

  public async getAll() {
    const collections = await this.dbClient.nftCollection.findMany({
      include: {
        tokens: true,
      },
    });
    console.log(collections);
    return collections;
  }

  public async getByAddress(address: Address) {
    const collection = await this.dbClient.nftCollection.findUnique({
      where: {
        contractAddress: address,
      },
      include: {
        tokens: true,
      },
    });

    if (collection) return collection;

    try {
      const blockchainService = NftCollection.getInstance(address);
      const name = await blockchainService.name();
      const symbol = await blockchainService.symbol();
      const tokenCount = await blockchainService.tokenCount();

      const collectionCreated = await this.dbClient.nftCollection.create({
        data: {
          contractAddress: address,
          name,
          symbol,
          owner: {
            connectOrCreate: {
              where: {
                blockchainAddress: await blockchainService.owner(),
              },
              create: {
                blockchainAddress: await blockchainService.owner(),
                email: "",
                name: "",
                password: "",
              },
            },
          },
        },
      });

      for (let i = 0; i < tokenCount; i++) {
        await this.syncTokenFromBlockchain({
          contractAddress: address,
          tokenId: i,
        });
      }

      return this.dbClient.nftCollection.findUnique({
        where: {
          contractAddress: address,
        },
        include: {
          tokens: true,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async updateTokenOwner(data: {
    newOwner: Address;
    tokenId: string;
    contractAddress: Address;
  }) {
    const { newOwner, tokenId, contractAddress } = data;

    const token = await this.dbClient.nftToken.findFirst({
      where: {
        AND: [{ tokenId }, { collection: { contractAddress } }],
      },
      include: {
        user: true,
      },
    });

    if (!token) {
      logger.error("Token not found for updating owner");
      return;
    }

    if (token.user.blockchainAddress === newOwner) {
      logger.info("Token already owned by new owner");
      return;
    }

    await this.dbClient.nftToken.update({
      where: {
        id: token.id,
      },
      data: {
        user: {
          connectOrCreate: {
            where: {
              blockchainAddress: newOwner,
            },
            create: {
              blockchainAddress: newOwner,
              email: "",
              name: "",
              password: "",
            },
          },
        },
      },
    });
    logger.info(`Token ${tokenId} from collection ${contractAddress} updated`);
  }

  public async syncTokenFromBlockchain(data: {
    tokenId: number;
    contractAddress: Address;
  }) {
    try {
      const { tokenId, contractAddress } = data;

      const token = await this.dbClient.nftToken.findFirst({
        where: {
          AND: [
            { tokenId: tokenId.toString() },
            { collection: { contractAddress } },
          ],
        },
      });

      if (token) {
        logger.info("Token already existing, skipping");
        return;
      }

      const blockchainService = NftCollection.getInstance(contractAddress);
      const tokenURI = await blockchainService.tokenURI(tokenId);
      const hash = tokenURI.split("ipfs://").pop();
      if (!hash) {
        Promise.reject("Hash not found");
        return;
      }

      const tokenMetadata = await ipfsService.get(hash);
      const tokenMetadataJson = await tokenMetadata.json();
      const owner = await blockchainService.ownerOf(tokenId);

      const imageHash = tokenMetadataJson.image.split("ipfs://").pop();

      if (!imageHash) {
        Promise.reject("Image hash not found");
        return;
      }

      const imageResponse = await ipfsService.get(imageHash);
      const contentType: string =
        imageResponse.headers.get("content-type") || "application/octet-stream";
      const arrayBuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await S3Service.getInstance().upload(imageHash, buffer, contentType);
      await this.dbClient.nftToken.create({
        data: {
          tokenId: tokenId.toString(),
          description: tokenMetadataJson.description,
          image: imageHash,
          name: tokenMetadataJson.name,
          user: {
            connectOrCreate: {
              where: {
                blockchainAddress: owner,
              },
              create: {
                blockchainAddress: owner,
                email: "",
                name: "",
                password: "",
              },
            },
          },
          collection: {
            connect: {
              contractAddress,
            },
          },
        },
      });
    } catch (e) {
      logger.error(e);
    }
  }

  public async updateCollectionOwner(data: {
    collectionAddress: Address;
    newOwner: Address;
  }) {
    const { collectionAddress, newOwner } = data;
    await this.dbClient.nftCollection.update({
      where: {
        contractAddress: collectionAddress,
      },
      data: {
        owner: {
          connectOrCreate: {
            where: {
              blockchainAddress: newOwner,
            },
            create: {
              blockchainAddress: newOwner,
              email: "",
              name: "",
              password: "",
            },
          },
        },
      },
    });

    logger.info(`Collection owner updated to ${newOwner}`);
  }
}
