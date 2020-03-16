export class Product {

  id: string;

  name: string;
  brief: string;
  image: string;

  price: number;
  stock: number;
  weight: number;

  description: string;

  tags: string[];

  constructor() {
    this.id = '0';

    this.name = 'Product name';
    this.brief = 'lorem epsum dolor';
    this.image = 'https://via.placeholder.com/200';
    this.price = 5.50;
    this.stock = 5;
    this.weight = 4;

    this.description = 'Lorem ipsum dolor sit amet, in erant aliquando percipitur eam, malis disputationi an per, sit unum adipisci salutandi ea. Sit adhuc nobis alterum et, ei nec dolorem fierent offendit, ad per laudem causae. Ea his vocent necessitatibus, solet quando ex vis, in pri tantas voluptatum intellegebat. Est te facilisis aliquando conclusiwomanmque, vis an fugit altera essent.';

    this.tags = ['fresh', 'soap'];
  }
}
