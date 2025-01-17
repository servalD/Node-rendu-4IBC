import { Address } from "viem";
import UserCreateRequestResource from "../../../commons/dist/resources/user/UserCreateRequestResource";
import DbClient from "../databases/DbClient";
import NftCollection from "../blockchain/contracts/NftCollection";
import IpfsService from "./IpfsService";
import S3Service from "./S3Service";

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
      const ipfsService = IpfsService.getInstance();

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
        const tokenId = i;
        const tokenURI = await blockchainService.tokenURI(tokenId);
        const hash = tokenURI.split("ipfs://").pop();
        if (!hash) continue;

        const tokenMetadata = await ipfsService.get(hash);
        const tokenMetadataJson = await tokenMetadata.json();
        const owner = await blockchainService.ownerOf(tokenId);

        const imageHash = tokenMetadataJson.image.split("ipfs://").pop();

        if (!imageHash) continue;

        const imageResponse = await ipfsService.get(imageHash);
        const contentType: string =
          imageResponse.headers.get("content-type") ||
          "application/octet-stream";
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
                contractAddress: address,
              },
            },
          },
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
}
