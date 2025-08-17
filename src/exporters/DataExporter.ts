import fs from 'fs';
import path from 'path';
// import fetch from 'node-fetch';
import { UserData } from '../data/UserData';

export abstract class DataExporter {
  protected users: UserData[] = [];
  protected result: string = '';

  // Шаблонний метод
  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.render();
    this.afterRender();
    this.save();
  }

  // Завантаження даних з API
  protected async load(): Promise<void> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    this.users = data.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
    }));
  }

  // Трансформація: вибір потрібних полів + сортування за name
  protected transform(): void {
    this.users.sort((a, b) => a.name.localeCompare(b.name));
  }

  // hook – порожня реалізація
  protected beforeRender(): void {}

  // Абстрактні методи
  protected abstract render(): void;
  protected abstract save(): void;

  // hook – порожня реалізація
  protected afterRender(): void {}
}
