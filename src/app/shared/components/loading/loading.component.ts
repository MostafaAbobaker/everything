import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
