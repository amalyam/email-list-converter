import fs from "fs";
import Contact from "./contact-interface";

/*
Converts a .txt list of emails in format 
"FirstName LastName <email@website.com>"
to a CSV file format "First Name, Last Name, Email Address"

contact full regex: /(?<first>[\w\-]*) *(?<last>[\w\-\s]*\w)\s *<(?<email>.*)>/gm;
*/

class EmailListConverter {
  constructor(public fileName: string) {}
  public contactsArray: Contact[] = [];
  public csvText: string = `First Name, Last Name, Email Address,\n`;

  getEmailTxt(): string {
    return fs.readFileSync(`${this.fileName}`, "utf8");
  }

  processContacts() {
    // each array item is a string of "FirstName LastName <email@website.com>"
    const contactRegex =
      /^(?<first>[\w\-]*) +(?<last>[\w\-\s]*?) *<(?<email>.*)>,?$/gm;
    let emailTxt: string = this.getEmailTxt();
    let unfilteredEmailArr = [...emailTxt.matchAll(contactRegex)];

    // make each entry into a Contact object, push to contactsArray, add to CSV string for output
    unfilteredEmailArr.forEach((entry) => {
      let newContact: Contact = {
        firstName: entry.groups?.first ?? "",
        lastName: entry.groups?.last ?? "",
        email: entry.groups?.email ?? "",
      };
      this.csvText += `${newContact.firstName}, ${newContact.lastName}, ${newContact.email},\n`;

      this.contactsArray.push(newContact);
    });
  }

  print() {
    console.log(this.csvText);
  }
}

const newEmailList = new EmailListConverter("./email-list.txt");
newEmailList.processContacts();
newEmailList.print();
