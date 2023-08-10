import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';
import { TokenData } from 'src/models/tokenData';
import { TokenService } from 'src/services/token/token.service';
import { DataPointsModel } from 'src/models/datapoints';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  tokenData: TokenData | any;
  categorySummary: any;
  mostMoneyonCategory: any;
  mostSpentonCategory: any;
  totalExpenditure: any;
  transactionSummary: any;

  localDataPoints: DataPointsModel[] = [];
  localBarPoints: DataPointsModel[] = [];

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.tokenData = this.tokenService.getTokenData();
  }
  ngOnInit(): void {
    this.getCategorySummary();
    this.getTransactionSummary();
  }

  getCategorySummary() {
    this.http
      .get(
        `https://localhost:7279/Transaction/CategorySummary?userId=${this.tokenData.Id}`
      )
      .subscribe(
        (result) => {
          console.log(result);
          this.categorySummary = result;
          this.mostMoneyonCategory = this.categorySummary[0].value;
          this.mostSpentonCategory = this.categorySummary[0].key;
          let sum = 0;
          for (const category of this.categorySummary) {
            sum += category.value;
            const newLocalDataPoint: DataPointsModel = {
              y: category.value,
              label: category.key,
            };
            this.localDataPoints.push(newLocalDataPoint);
          }
          this.totalExpenditure = sum;

          console.log(this.localDataPoints);
          this.renderChart();
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  getTransactionSummary() {
    this.http
      .get(
        `https://localhost:7279/Transaction/TransactionAmountSummary?userId=${this.tokenData.Id}`
      )
      .subscribe(
        (result) => {
          this.transactionSummary = result;
          for (const transaction of this.transactionSummary) {
            const newLocalDataPoint: DataPointsModel = {
              label: transaction.key,
              y: transaction.value,
            };
            this.localBarPoints.push(newLocalDataPoint);
          }
          console.log(this.localBarPoints);
          this.barChartRender();
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  renderChart() {
    const chart = new CanvasJS.Chart('pieChartContainer', {
      theme: 'light2', // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: 'Total Expenses by Category',
      },
      data: [
        {
          type: 'pie',
          startAngle: 25,
          toolTipContent: `<b>{label}</b>: (${this.totalExpenditure}/{y})`,
          showInLegend: 'true',
          legendText: '{label}',
          indexLabelFontSize: 16,
          indexLabel: '{label} - {y}',
          dataPoints: this.localDataPoints,
        },
      ],
    });
    chart.render();
  }

  barChartRender() {
    const barChart = new CanvasJS.Chart('barChartContainer', {
      theme: 'light1', // "light2", "dark1", "dark2"
      animationEnabled: true, // change to true
      title: {
        text: 'Month wise spends',
      },
      data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: 'spline',
          dataPoints: this.localBarPoints,
        },
      ],
    });
    barChart.render();
  }
}
