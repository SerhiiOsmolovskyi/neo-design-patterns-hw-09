import fs from 'fs';
import { DataExporter } from './DataExporter';

export class XmlExporter extends DataExporter {
  protected render(): void {
    const rows = this.users
      .map(
        u => `
  <user>
    <id>${u.id}</id>
    <name>${u.name}</name>
    <email>${u.email}</email>
    <phone>${u.phone}</phone>
  </user>`
      )
      .join('');

    this.result = `<?xml version="1.0" encoding="UTF-8"?>\n<users>${rows}\n</users>`;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected save(): void {
    fs.writeFileSync('dist/users.xml', this.result, 'utf-8');
    console.log('users.xml збережено!');
  }
}
