import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import {
  Chart as ChartJS,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboardcharts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective], // ✅ use BaseChartDirective
  templateUrl: './dashboardcharts.component.html',
  styleUrl: './dashboardcharts.component.css'
})


export class DashboardchartsComponent {

// Bar Chart
barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      data: [65, 59, 80, 81],
      label: 'Revenue',
      backgroundColor: '#72ace6',
      borderColor: '#57a1eb',
      borderWidth: 1
    },
    {
      data: [28, 48, 40, 19],
      label: 'Expenses',
      backgroundColor: '#F44336', // Red
      borderColor: '#D32F2F',
      borderWidth: 1
    }
  ]
};
barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  maintainAspectRatio: false, // allows fixed-height control via CSS
  plugins: {
    tooltip: {
      enabled: true
    },
    legend: {
      display: true
    }
  },
  scales: {
    x: {},
    y: {
      beginAtZero: true
    }
  }
};
barChartType: 'bar' = 'bar';



// Doughnut Chart
doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
  labels: ['Chrome', 'Firefox', 'Edge'],
  datasets: [
    {
      data: [350, 450, 100],
      backgroundColor: ['#4285F4', '#FF7139', '#34A853'], // Chrome, Firefox, Edge
      borderColor: ['#3367D6', '#E65100', '#0F9D58'],
      borderWidth: 1
    }
  ]
};
doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  maintainAspectRatio: false, // This allows CSS height to apply
  plugins: {
    tooltip: {
      enabled: true
    },
    legend: {
      position: 'top'
    }
  }
};
doughnutChartType: 'doughnut' = 'doughnut';




  
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4','Q5','Q6','Q7','Q8','Q9','Q10'],
    datasets: [
      {
        data: [10, 50, 30, 70, 10, 15, 20, 60, 40, 90],
        label: 'User Growth',
        fill: true,
        //tension: 0.4,
        borderColor: '#3cba9f',
        backgroundColor: '#72f606'
      }
    ]
  };
  lineChartOptions: ChartConfiguration<'line'>['options'] = 
  {
    responsive: true,
    maintainAspectRatio: false,  // Important for fixed height
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      },
      legend: {
        display: true
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7
      }
    }
  };
  lineChartType: 'line' = 'line';
    
}
