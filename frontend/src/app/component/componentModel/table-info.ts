/**
 * this model class contains variable for table info
 */
export class TableInfo {
  id: number;
  name: string;
  reason: string;
  ip: string;
  serviceName: string;
  smscName: string;
  keyword: string;
  code: string;
  expiryDate: string;
  promoCode: string;
  price: string;
  contactList: string;
  contactDetails: string;
  contactListId: string;
  contactId: string;
  currency: string;
  error: string;
  countryOperator: string;
  country: string;
  msisdn: string;
  type: string;
  dateTime: string;
  balance: string;
  msgContent: string;
  recievedSmsId: string;
  shortCode: string;
  channel: string;
  email: string;
  phone: string;
  optedOutReason: string;
  matter?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  action: string;
  status: string;
  step: string;
  activity: number;
  noOfMessageAllowed: number;
  noOfMessageSent: number;
  noOfMessageRemaining: number;
  relationTableId: number;
  verified: boolean;
  expireAfter: string;
  isExpired: string;
}
