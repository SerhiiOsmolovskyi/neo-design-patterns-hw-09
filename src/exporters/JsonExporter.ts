import fs from 'fs';
import { DataExporter } from './DataExporter';

export class JsonExporter extends DataExporter {
  protected render(): void {
    this.result = JSON.stringify(this.users, null, 2);
  }

  protected save(): void {
    fs.writeFileSync('dist/users.json', this.result, 'utf-8');
    console.log('users.json збережено!');
  }
}
