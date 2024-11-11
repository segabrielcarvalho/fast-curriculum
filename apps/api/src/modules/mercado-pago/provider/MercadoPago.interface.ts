export interface ICreateMPUserTestInput {
   site_id: string;
   description: string;
}

export interface ICreateMPUserTestOutput {
   id: number;
   nickname: string;
   password: string;
   site_status: string;
   site_id: string;
   description: string;
   email: string;
   date_created: string;
   date_last_updated: string;
}
