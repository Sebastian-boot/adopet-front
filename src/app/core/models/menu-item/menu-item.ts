import { SafeHtml } from "@angular/platform-browser";

export interface MenuItem {
  path: string;
  title: string;
  icon: SafeHtml;
  roles?: string[];
  isVisible?: boolean;
}
