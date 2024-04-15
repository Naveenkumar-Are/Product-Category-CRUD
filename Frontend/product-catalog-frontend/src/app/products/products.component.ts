import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any = [];
  public productForm: any = {};
  public showForm: boolean = false;
  public editing: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get('http://localhost:3000/products').subscribe((data: any) => {
      this.products = data;
    }, error => console.error(error));
  }

  submitForm() {
    if (this.editing) {
      this.updateProduct(this.productForm);
    } else {
      this.addProduct(this.productForm);
    }
  }

  addProduct(product: any) {
    this.http.post('http://localhost:3000/products', product).subscribe(() => {
      this.getProducts();
      this.showForm = false;
      this.productForm = {};
    }, error => console.error(error));
  }

  updateProduct(product: any) {
    this.http.put(`http://localhost:3000/products/${product.id}`, product).subscribe(() => {
      this.getProducts();
      this.showForm = false;
      this.productForm = {};
      this.editing = false;
    }, error => console.error(error));
  }

  deleteProduct(id: number) {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
      this.getProducts();
    }, error => console.error(error));
  }

  showCreateForm() {
    this.showForm = true;
    this.editing = false;
    this.productForm = {};
  }

  editProduct(product: any) {
    this.productForm = { ...product };
    this.showForm = true;
    this.editing = true;
  }

  cancel() {
    this.showForm = false;
    this.editing = false;
    this.productForm = {};
  }
}
