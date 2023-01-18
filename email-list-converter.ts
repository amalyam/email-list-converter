import { fs } from "fs";

/*
Converts a .txt list of emails in format 
"FirstName LastName <email@website.com"
to a CSV file format "First Name, Last Name, email"

Notes for later:
These last names seem to contain multiple parts. Separate into middle and last names?
*/

class EmailListConverter {
  public emailTxt: string = this.getEmailTxt();
  public unfilteredEmailArr: string[] = this.emailTxt.split(",");

  getEmailTxt() {
    return fs.readFile("email-list.txt");
  }
}
