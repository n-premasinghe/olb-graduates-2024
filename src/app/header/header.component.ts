import { Component, EventEmitter, Output, inject, } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbCollapseModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() uid2 = new EventEmitter();

  authService = inject(AuthServiceService);

  uid = this.authService.currentUser!.uid;

  isMenuCollapsed = true;

  onViewProfile() {
    this.uid2.emit();
  }

}
