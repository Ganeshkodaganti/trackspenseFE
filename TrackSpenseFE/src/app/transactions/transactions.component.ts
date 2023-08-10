import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenData } from 'src/models/tokenData';
import { TokenService } from 'src/services/token/token.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  tokenData: TokenData | any;
  transactions: any;
  categories: any;
  transactionsList: any;
  isTransaction = false;
  isEditing: boolean = false;

  constructor(private tokenService: TokenService, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.isTransaction =
      window.location.pathname == '/transactions' ? true : false;
    this.tokenData = await this.tokenService.getTokenData();
    this.getTransactions();
    this.getCategories();
  }

  getTransactions() {
    this.http
      .get(
        `https://localhost:7279/Transaction/GetTransactions?UserId=${this.tokenData.Id}`
      )
      .subscribe(
        (result) => {
          console.log(result);
          this.transactionsList = result;
          this.transactions = this.transactionsList;
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  getCategories() {
    this.http
      .get(
        `https://localhost:7279/Category/GetCategories?UserId=${this.tokenData.Id}`
      )
      .subscribe(
        (result) => {
          this.categories = result;
          console.log(this.categories);
        },
        (error) => {
          console.log('Error' + error);
        }
      );
  }
  deleteTransaction(transaction: any) {
    this.http
      .delete(
        `https://localhost:7279/Transaction/DeleteTransaction?transactionId=${transaction.transactionId}`
      )
      .subscribe(
        (result) => {
          console.log(result);
          this.getTransactions();
          window.location.reload();
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }
  isEmpty() {
    if (this.transactions == null) return false;
    return Array.isArray(this.transactions) && this.transactions.length === 0;
  }
  
  filterTransactions(categoryName: any) {
    // Your filtering logic here based on the selected category
    // For example, you can filter the transactions array to show only transactions for the selected category.
    categoryName = categoryName.target.value;

    if (categoryName == 'all') {
      this.transactions = this.transactionsList;
      return;
    }
    this.transactions = [];
    for (const transaction of this.transactionsList) {
      if (transaction.transactionCategory == categoryName)
        this.transactions.push(transaction);
    }

    console.log(this.transactions);
  }
  toggleEditState() {
    this.isEditing = !this.isEditing;
  }

  saveTransaction(transaction: any) {
    // You can perform any additional logic or API calls here to save the transaction.
    console.log(transaction);
    this.isEditing = false;
  }
}
