import fs from 'fs';
import { UserData } from '../data/UserData';

export class XmlIterator {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(/<user>[\s\S]*?<\/user>/g) || [];
    this.users = matches.map(block => {
      const get = (tag: string) =>
        block.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`))?.[1] || '';
      return {
        id: +get('id'),
        name: get('name'),
        email: get('email'),
        phone: get('phone'),
      };
    });
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}
