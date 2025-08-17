import fs from 'fs';
import { UserData } from '../data/UserData';

export class CsvIterator {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const [header, ...lines] = content.split('\n').filter(Boolean);
    this.users = lines.map(line => {
      const [id, name, email, phone] = line.split(',');
      return { id: +id, name, email, phone };
    });
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}
