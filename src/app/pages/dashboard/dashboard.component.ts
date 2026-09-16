import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';
import { Subscription } from 'rxjs';
import { chartOptions, parseOptions } from '../../variables/charts';
import { DemoService } from '../../demo/demo.service';
import { DemoStoreService } from '../../demo/demo-store.service';

// Pulled from assets/scss/theme/_tokens.scss. Chart.js paints onto a canvas,
// so it cannot read the CSS custom properties and needs the literals.
const BRAND = '#b37f33';
const BRAND_SOFT = 'rgba(179, 127, 51, 0.12)';
const INK = '#464f4f';
const GRID = '#e6e9ea';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  public salesChart: any;
  public ordersChart: any;

  /** Which series the sales chart shows: months or weekdays. */
  public clicked = true;
  public clicked1 = false;

  // Headline figures, all derived from the same sales and stock the list
  // pages show, rather than the four invented constants that used to be
  // hard-coded into the template.
  public revenue = 0;
  public salesCount = 0;
  public unpaidCount = 0;
  public lowStockCount = 0;
  public stockValue = 0;
  public clientCount = 0;
  public topProducts: any[] = [];

  private sub = new Subscription();

  constructor(private store: DemoStoreService, private demo: DemoService) { }

  ngOnInit() {
    this.readFigures();
    this.sub.add(this.demo.resets$.subscribe(() => {
      this.readFigures();
      this.drawCharts();
    }));
  }

  ngAfterViewInit() {
    // The canvases only exist once the view is up.
    parseOptions(Chart, chartOptions());
    this.drawCharts();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.salesChart) { this.salesChart.destroy(); }
    if (this.ordersChart) { this.ordersChart.destroy(); }
  }

  private readFigures() {
    this.revenue = this.store.revenue;
    this.salesCount = this.store.sales.length;
    this.unpaidCount = this.store.unpaidCount;
    this.lowStockCount = this.store.lowStockCount;
    this.stockValue = this.store.stockValue;
    this.clientCount = this.store.clients.length;
    this.topProducts = this.store.topProducts(5);
  }

  private drawCharts() {
    if (this.salesChart) { this.salesChart.destroy(); }
    if (this.ordersChart) { this.ordersChart.destroy(); }

    const monthly = this.store.monthlyRevenue(9);

    const salesCanvas = document.getElementById('chart-sales');
    this.salesChart = new Chart(salesCanvas, {
      type: 'line',
      data: {
        labels: monthly.labels,
        datasets: [{
          label: 'Chiffre d affaires',
          data: monthly.values,
          borderColor: BRAND,
          backgroundColor: BRAND_SOFT,
          // Filled area under the line: the trend is easier to read than a
          // bare stroke, and it matches the soft look of the rest of the UI.
          fill: true,
          pointBackgroundColor: BRAND,
          pointRadius: 0,
          pointHoverRadius: 5,
        }]
      },
      options: this.lineOptions(' TND')
    });

    const weekly = this.store.weeklyVolume();

    const ordersCanvas = document.getElementById('chart-orders');
    this.ordersChart = new Chart(ordersCanvas, {
      type: 'bar',
      data: {
        labels: weekly.labels,
        datasets: [{
          label: 'Ventes',
          data: weekly.values,
          backgroundColor: INK,
          hoverBackgroundColor: BRAND,
          maxBarThickness: 18,
        }]
      },
      options: this.barOptions()
    });
  }

  /** Switches the sales chart between monthly revenue and weekly volume. */
  public showMonthly() {
    this.clicked = true;
    this.clicked1 = false;

    const monthly = this.store.monthlyRevenue(9);
    this.salesChart.data.labels = monthly.labels;
    this.salesChart.data.datasets[0].data = monthly.values;
    this.salesChart.options = this.lineOptions(' TND');
    this.salesChart.update();
  }

  public showWeekly() {
    this.clicked = false;
    this.clicked1 = true;

    const weekly = this.store.weeklyVolume();
    this.salesChart.data.labels = weekly.labels;
    this.salesChart.data.datasets[0].data = weekly.values;
    this.salesChart.options = this.lineOptions('');
    this.salesChart.update();
  }

  private lineOptions(suffix: string) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1c2222',
        titleFontFamily: 'Inter',
        bodyFontFamily: 'Inter',
        cornerRadius: 8,
        xPadding: 10,
        yPadding: 8,
        displayColors: false,
        callbacks: {
          label: (item) => `${Number(item.yLabel).toLocaleString('fr-FR')}${suffix}`
        }
      },
      scales: {
        yAxes: [{
          gridLines: { color: GRID, drawBorder: false, zeroLineColor: GRID },
          ticks: {
            beginAtZero: true,
            padding: 10,
            fontColor: '#8b9595',
            // Argon's default tick callback returned undefined unless the
            // value divided by 10, which silently blanked most labels.
            callback: (value) => Number(value).toLocaleString('fr-FR')
          }
        }],
        xAxes: [{
          gridLines: { drawBorder: false, drawOnChartArea: false, drawTicks: false },
          ticks: { padding: 12, fontColor: '#8b9595' }
        }]
      }
    };
  }

  private barOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: {
        backgroundColor: '#1c2222',
        titleFontFamily: 'Inter',
        bodyFontFamily: 'Inter',
        cornerRadius: 8,
        xPadding: 10,
        yPadding: 8,
        displayColors: false,
      },
      scales: {
        yAxes: [{
          gridLines: { color: GRID, drawBorder: false, zeroLineColor: GRID },
          ticks: { beginAtZero: true, padding: 10, fontColor: '#8b9595', precision: 0 }
        }],
        xAxes: [{
          gridLines: { drawBorder: false, drawOnChartArea: false, drawTicks: false },
          ticks: { padding: 12, fontColor: '#8b9595' }
        }]
      }
    };
  }
}
