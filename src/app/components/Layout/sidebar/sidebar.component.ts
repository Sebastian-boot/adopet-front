import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../../core/models/menu-item/menu-item';
import { MenuService } from '../../../core/services/shared/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isSidebarCollapsed = true;
  menuItems$;

  constructor(private menuService: MenuService) {
    this.menuItems$ = this.menuService.getMenuItems();
  }

  ngOnInit(): void {}
}
