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
  unfilteredEmailArr: string[] = this.emailTxt.split(",");
  // public contactsArray: Contact[] = [];
  public csvText: string = `First Name, Last Name, Email Address,\n`;

  getEmailTxt(): string {
    return fs.readFileSync(`${this.fileName}`, "utf8");
  }

  processContacts() {
    // each array item is a string of "FirstName LastName <email@website.com>"
    const contactRegex =
      /(?<first>[\w\-]*) *(?<last>[\w\-\s]*\w)\s *<(?<email>.*)>/gm;

    // make each entry into a Contact object, push to contactsArray, add to CSV string for output
    this.unfilteredEmailArr.forEach((entry) => {
      //let newContact: Contact = { firstName: "", lastName: "", email: "" };
      let entryInfoArr = entry.match(contactRegex);

      if (entryInfoArr) {
        entryInfoArr.forEach((contact) => {
          contact.replace(" ", ", ");
          this.csvText += `${contact},\n`;
        });

        //this.contactsArray.push(newContact);
      } else {
        throw new Error("Cannot process contact info");
      }
    });
  }

  print() {
    console.log(this.csvText);
  }
}

const newEmailList = new EmailListConverter("./email-list.txt");
newEmailList.processContacts();
newEmailList.print();
