import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatLabel, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-theme',
  imports: [MatLabel, MatFormFieldModule, MatSelectModule, MatIcon],
  templateUrl: './select-theme.html',
  styleUrl: './select-theme.scss',
})
export class SelectTheme {
  // Två teman, mörkt och ljust
  theme = signal<"light" | "dark">("light");

  // Känner av tema och ändringar hos användaren
  constructor() {

    const savedTheme = sessionStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      this.changeTheme(savedTheme);
      return;
    }
    // Om valt tema är mörkt
    const preferredDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Om valt tema är ljust
    const preferredLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;

    // Om den har valt mörkttema
    if (preferredDarkTheme) {
      this.changeTheme("dark");
      this.theme.set("dark");

    } else if (preferredLightTheme) {// Om den har valt ljusttema
      this.changeTheme("light");
      this.theme.set("light");
    }
  }
  // Om man byter tema via select-boxen
  changeTheme(theme: "light" | "dark") {
    sessionStorage.setItem("theme", theme);
    this.theme.set(theme); // Uppdaterar signalen utifrån det valda temat
    if (theme === "light") { // Vid klick på ljusttema sätts klassen ljusttema
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    } else if (theme === "dark") { // Vid klick på mörkttema sätts klassen mörkttema
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    }
  }
}
