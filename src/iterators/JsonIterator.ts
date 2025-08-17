import fs from 'fs';
import { UserData } from '../data/UserData';

export class JsonIterator {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    this.users = JSON.parse(content);
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}
