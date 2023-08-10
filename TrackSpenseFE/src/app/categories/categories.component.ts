import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/models/category';
import { TokenData } from 'src/models/tokenData';
import { TokenService } from 'src/services/token/token.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  tokenData: TokenData | any;
  categories: any = null;
  addCategoryCredentials: CategoryModel = {
    categoryId: '',
    categoryName: '',
    userId: '',
  };
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenData = this.tokenService.getTokenData();
    this.getCategories();
  }
  addCategory() {
    this.addCategoryCredentials.userId = this.tokenData.Id;
    if (this.addCategoryCredentials.categoryName.length > 0) {
      this.http
        .post(
          `https://localhost:7279/Category/AddCategory`,
          this.addCategoryCredentials
        )
        .subscribe(
          (result) => {
            console.log(result);
            window.location.reload();
          },
          (error) => {
            console.log('Error' + error);
          }
        );
    }
  }

  getCategories() {
    this.http
      .get(
        `https://localhost:7279/Category/GetCategories?UserId=${this.tokenData.Id}`
      )
      .subscribe(
        (result) => {
          this.categories = result;
          console.log('Categories :' + this.categories);
        },
        (error) => {
          console.log('Error' + error);
        }
      );
  }

  deleteCategory(category: any) {
    this.http
      .delete(
        `https://localhost:7279/Category/DeleteCategory?categoryId=${category.categoryId}`
      )
      .subscribe(
        (result) => {
          console.log(result);
          this.getCategories();
        },
        (error) => {
          console.log('Error' + error);
        }
      );
  }
  isEmpty() {
    if (this.categories == null) return true;
    return Array.isArray(this.categories) && this.categories.length == 0;
  }
}
