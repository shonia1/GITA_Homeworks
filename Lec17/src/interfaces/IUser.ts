// ეს არის მომხმარებლის მონაცემების ტიპი, რომლის მიხედვით ვავსებთ რეალურ ინფორმაციას
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  // თითოეულ მომხმარებელს აქვს კომპანია, რომლის სახელიაც გვჭირდება
  company: {
    name: string;
  };
}
