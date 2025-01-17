export default class IpfsService {
  private static ipfsService: IpfsService;

  public static getInstance() {
    if (!this.ipfsService) {
      this.ipfsService = new IpfsService();
    }
    return this.ipfsService;
  }

  private gateway = "https://black-marginal-catfish-869.mypinata.cloud/ipfs";

  public async get(hash: string) {
    return fetch(`${this.gateway}/${hash}`);
  }
}
