import { fs } from "fs";
import { Contact } from "./contact-interface";

/*
Converts a .txt list of emails in format 
"FirstName LastName <email@website.com>"
to a CSV file format "First Name, Last Name, Email Address"
*/

class EmailListConverter {
  public emailTxt: string = this.getEmailTxt();
  public contactsArray: Contact[];
  public csvText: string = `First Name, Last Name, Email Address\n`;

  getEmailTxt(): string {
    return fs.readFile("email-list.txt");
  }

  filterEmailArray() {
    // each array item is a string of "FirstName LastName <email@website.com>"
    let unfilteredEmailArr: string[] = this.emailTxt.split(",");

    // make each entry into a Contact object, push to contactsArray
    // firstName is between [0] and first space
    // lastName is between first space and <
    // email is between < and entry.length - 1
    unfilteredEmailArr.forEach((entry) => {
      let firstSpace = entry.indexOf(" ");
      let openAngBr = entry.indexOf("<");
      let newContact: Contact;

      newContact.firstName = entry.slice(0, firstSpace);
      newContact.lastName = entry.slice(firstSpace + 1, openAngBr);
      newContact.email = entry.slice(openAngBr + 1, entry.length - 1);

      this.contactsArray.push(newContact);

      this.csvText += `${newContact.firstName}, ${newContact.lastName}, ${newContact.email}\n`;
    });
  }
}
