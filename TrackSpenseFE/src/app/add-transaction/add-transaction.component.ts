import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TransactionModel } from 'src/models/add_transaction';
import { TokenData } from 'src/models/tokenData';
import { TokenService } from 'src/services/token/token.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent implements OnInit {
  tokenData: TokenData | any;
  categories: any;

  constructor(private tokenService: TokenService, private http: HttpClient) {}

  addTransactionCredentials: TransactionModel = {
    transactionAmount: 0,
    transactionCategory: '',
    transactionDate: new Date(),
    transactionDescription: '',
    transactionId: '',
    transactionName: '',
    userId: '',
  };

  ngOnInit(): void {
    this.tokenData = this.tokenService.getTokenData();
    this.getCategories();
  }

  getCategories() {
    this.http
      .get(
        `https://localhost:7279/Category/GetCategories?UserId=${this.tokenData.Id}`
      )
      .subscribe(
        (result) => {
          this.categories = result;
          console.log(result);
        },
        (error) => {
          console.log('Error' + error);
        }
      );
  }

  async addTransaction() {
    console.log('add transaction function called');
    console.log(this.addTransactionCredentials);
    this.addTransactionCredentials.userId = await this.tokenData.Id;
    this.http
      .post(
        'https://localhost:7279/Transaction/AddTransaction',
        this.addTransactionCredentials
      )
      .subscribe(
        (result) => {
          console.log(result);
          window.location.reload();
        },
        (error) => {
          console.log('Error :' + error);
        }
      );
  }
}
