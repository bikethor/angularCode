import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

// Components
import { ChatComponent } from '../chat/chat.component';

// Services
import { MenuService, MenuItem } from '../services/menu.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { UserService, UserWithUnread } from '../services/user.service';
import { ChatService, Message } from '../chat/chat.service';
import { ChatEventsService } from '../services/chat-events.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ChatComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Sidebar / UI
  isSidebarOpen = true;
  showDropdown = false;

  // Chat
  chatVisible = false;
  chatOpen = false;
  selectedUser: UserWithUnread | null = null;
  ChatUserId: number | null = null;
  unreadCount = 0;

  // Users
  users: UserWithUnread[] = [];
  searchText = '';

  // Menu
  menuItems: MenuItem[] = [];

  constructor(
    public auth: AuthService,
    private menuService: MenuService,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    private chatService: ChatService,
    private chatEvents: ChatEventsService
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.loadUsers();
    this.fetchUnreadCount();
    this.subscribeToChatEvents();
    this.subscribeToNotifications();

    console.log('User ID:', this.auth.idUser);
    console.log('Token:', this.auth.token);
  }

  // --- Initialization ---
  loadMenu() {
    this.menuService.getMenu().subscribe(items => {
      this.menuItems = items;
    });
  }

  loadUsers() {
    this.userService.getUsersWithUnreadCounts(this.auth.idUser).subscribe(users => {
      this.users = users;
    });
  }

  fetchUnreadCount(): void {
    if (!this.chatOpen) {
      this.chatService.getUnreadMessagesCount(this.auth.idUser)
        .subscribe(count => this.unreadCount = count);
    }
  }

  subscribeToChatEvents() {
    this.chatEvents.messagesRead$.subscribe(() => {
      this.loadUsers();
      this.fetchUnreadCount();
    });
  }

  subscribeToNotifications() {
    this.notificationService.chat$.subscribe((message: Message | null) => {
      if (message && message.senderId !== this.auth.idUser) {
        this.counterBadge();
        this.loadUsers();
      }
    });
  }

  // --- Chat UI ---
  toggleChat() {
    this.chatVisible = !this.chatVisible;
    this.counterBadge();
  }

  selectChatUser(user: UserWithUnread) {
    this.selectedUser = user;
  }

  closeChat() {
    this.selectedUser = null;
  }

  counterBadge() {
    this.chatOpen ? this.unreadCount = 0 : this.fetchUnreadCount();
  }

  // --- Sidebar & Dropdown ---
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  get contentMargin() {
    return this.isSidebarOpen ? 'ml-250' : 'ml-80';
  }

  get switchLogo() {
    return this.isSidebarOpen ? 'logo-pic' : 'logo-pic-mini';
  }

  // --- User Search ---
  get filteredUsers(): UserWithUnread[] {
    const text = this.searchText.toLowerCase();
    return this.users.filter(user =>
      user.firstName.toLowerCase().includes(text) ||
      user.lastName.toLowerCase().includes(text)
    );
  }

  // --- Auth ---
  logout() {
    this.router.navigate(['/login']);
  }
}
