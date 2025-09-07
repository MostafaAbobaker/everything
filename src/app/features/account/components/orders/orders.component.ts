import { Component, inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Order } from '../../../home/interface/icart-item';
import { ShapingCartService } from '../../../home/services/shaping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  imagePath = environment.imagePath;
  ordersList: Order[] = [];
  expandedOrderId: number | null = null;
   private platformId = inject(PLATFORM_ID);

  statusList: any[] = [
    { id: 1, name: 'Pending', class: 'badge text-bg-warning' },
    { id: 2, name: 'Completed', class: 'badge text-bg-success' },
    { id: 3, name: 'PreRefund', class: 'badge text-bg-info' },
    { id: 4, name: 'Refunded', class: 'badge text-bg-primary' },
    { id: 5, name: 'Rejected', class: 'badge text-bg-danger' },
    { id: 6, name: 'RejectRefund', class: 'badge text-bg-dark' },
  ];
  constructor(
    private _shapingCartService: ShapingCartService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUserOrders();
  }
  getStatusById(id: number) {
    return this.statusList.find((s) => s.id === id);
  }
  getUserOrders() {
    debugger;
    if (isPlatformBrowser(this.platformId)) {

      this._shapingCartService
        .GetOrders(localStorage.getItem('everything-userId') || '')
        .subscribe({
          next: (result) => {
            this.ordersList = result.data;
          },
          error: (err) => {
            this.toastr.error(err.message, '', {
              closeButton: true,
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'decreasing',
            });
          },
        });
    }
  }
  toggleRow(orderId: number) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }
}
