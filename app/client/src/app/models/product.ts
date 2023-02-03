export class Product {
  constructor(
    public name: string,
    public type: string,
    public category: string,
    public primaryImage: string,
    public sizes: string[],
    public colors: string[],
    public quantity: number,
    public price: number,
    public description: string
  ) {}
}
