/**
 * this model class contains variable for contact list
 */
export class ContactListsInfo {
  /**
   * name of the contact
   */
  name: string;
  /**
   * number of the contact
   */
  phoneNumber: number;
  /**
   * address of the contact
   */
  defaultFromAddress: string;
  /**
   * id of the contact
   */
  id: string;
  /**
   * count of contacts
   */
  count: number;
  /**
   * name of the contact list
   */
  contactListName: string;
  /**
   * word to be searched
   */
  searchWord: string;
  customFields: any[] = [];
}
