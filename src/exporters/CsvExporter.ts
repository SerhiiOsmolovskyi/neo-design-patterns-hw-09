import fs from 'fs';
import { DataExporter } from './DataExporter';

export class CsvExporter extends DataExporter {
  protected render(): void {
    const header = 'id,name,email,phone';
    const rows = this.users.map(u => `${u.id},${u.name},${u.email},${u.phone}`);
    this.result = [header, ...rows].join('\n');
  }

  protected save(): void {
    fs.writeFileSync('dist/users.csv', this.result, 'utf-8');
    console.log('users.csv збережено!');
  }
}
