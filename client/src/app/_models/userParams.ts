import { User } from "./user";

export class UserParams{
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumbr = 1;
    pageSize = 5;
    orderBy = 'lasActive';

    /**
     *
     */
    constructor(user: User) {
       this.gender = user.gender === 'female' ? 'male' : 'female';

    }
}