import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from 'ng-apexcharts';

@Component({
  selector: 'app-apexcharts',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './apexcharts.component.html',
  styleUrl: './apexcharts.component.css'
})
export class ApexchartsComponent {

    // Bar chart
    barChartSeries: ApexAxisChartSeries = [
      { name: "Sales", data: [30, 40, 45, 50, 49, 60, 70, 91] }
    ];
    barChartOptions: ApexChart = {
      type: 'bar',
      height: 200
    };
    barChartXAxis: ApexXAxis = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    };
    barChartTitle: ApexTitleSubtitle = {
      text: 'Bar Chart Example',
      align: 'center'
    };
  





    // Doughnut chart
    doughnutChartSeries: ApexNonAxisChartSeries = [44, 55, 13, 43, 22];
    doughnutChartOptions: ApexChart = {
      type: 'donut',
      height: 200
    };
    doughnutChartLabels = ['Apples', 'Oranges', 'Bananas', 'Berries', 'Others'];
    doughnutChartLegend: ApexLegend = {
      position: 'bottom'
    };
    doughnutChartResponsive: ApexResponsive[] = [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }];

    // 🟰 Add tooltips and remove donut labels
    doughnutChartDataLabels: ApexDataLabels = {
      enabled: false // disable labels on slices
    };


  






    // Line chart
    lineChartSeries: ApexAxisChartSeries = [
      {
        name: "Revenue",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ];
    lineChartOptions: ApexChart = {
      type: 'line',
      height: 200
    };
    lineChartXAxis: ApexXAxis = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    };
    lineChartDataLabels: ApexDataLabels = {
      enabled: true
    };
    lineChartTitle: ApexTitleSubtitle = {
      text: 'Line Chart Example',
      align: 'center'
    };

}
