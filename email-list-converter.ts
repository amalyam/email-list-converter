import fs from "fs";
import Contact from "./contact-interface";

/*
Converts a .txt list of emails in format 
"FirstName LastName <email@website.com>"
to a CSV file format "First Name, Last Name, Email Address"
*/

class EmailListConverter {
  constructor(public fileName: string) {}
  public emailTxt: string = this.getEmailTxt();
  public contactsArray: Contact[] = [];
  public csvText: string = `First Name, Last Name, Email Address\n`;

  getEmailTxt(): string {
    return fs.readFileSync(`${this.fileName}`, "utf8");
  }

  filterEmailArray() {
    // each array item is a string of "FirstName LastName <email@website.com>"
    let unfilteredEmailArr: string[] = this.emailTxt.split(",");
    const contactRegex =
      /(?<first>[\w\-]*) *(?<last>[\w\-\s]*\w)\s *<(?<email>.*)>/gm;

    // make each entry into a Contact object, push to contactsArray, add to CSV string for output
    unfilteredEmailArr.forEach((entry) => {
      let newContact: Contact = { firstName: "", lastName: "", email: "" };
      let entryInfo = entry.match(contactRegex);

      if (entryInfo) {
        newContact.firstName = entryInfo[0];
        newContact.lastName = entryInfo[1];
        newContact.email = entryInfo[2];

        this.contactsArray.push(newContact);

        this.csvText += `${newContact.firstName}, ${newContact.lastName}, ${newContact.email}\n`;
      } else {
        throw new Error("Cannot process contact info");
      }
    });
  }

  print() {
    console.log(this.csvText);
  }
}

const newEmailList = new EmailListConverter("../email-list.txt");
newEmailList.print();
