import express, { Router } from "express";
import ApiResponses from "../ApiResponse";
import CollectionService from "../../services/CollectionsService";
import { isAddress } from "viem";
import NftCollectionResponseResource from "../../../../commons/dist/resources/nfts/NftCollectionResponseResource";
import S3Service from "../../services/S3Service";

export default (superRouter: Router) => {
  const router = express.Router();
  superRouter.use("/collections", router);

  router.get("/", async (req, res) => {
    ApiResponses.httpCreated(
      res,
      NftCollectionResponseResource.hydrateArray<NftCollectionResponseResource>(
        await CollectionService.getInstance().getAll()
      )
    );
  });

  router.get(`/:address`, async (req, res) => {
    const address = req.params.address;
    if (!isAddress(address)) {
      ApiResponses.httpBadRequest(res, {
        message: "Invalid address",
      });
      return;
    }
    const collection = await CollectionService.getInstance().getByAddress(
      address
    );
    if (!collection) {
      ApiResponses.httpNotFound(res, {
        message: "Collection not found",
      });
      return;
    }

    const collectionHydrated = {
      ...collection,
      tokens: await Promise.all(
        collection.tokens.map(async (token) => {
          return {
            ...token,
            image: await S3Service.getInstance().getUrl(token.image),
          };
        })
      ),
    };

    ApiResponses.httpSuccess(
      res,
      NftCollectionResponseResource.hydrate<NftCollectionResponseResource>(
        collectionHydrated
      )
    );
  });
};
